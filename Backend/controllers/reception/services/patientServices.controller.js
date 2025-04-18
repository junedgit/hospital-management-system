import Patient from "../../../models/reception/new_patient_reg/newPatient.model.js";
import Service from "../../../models/clinicAdmin/masterDataConfig/service/service.model.js";
import PatientServices from "../../../models/reception/services/patientServices.model.js";
import Clinic from "../../../models/superAdmin/clinic.model.js";

export const getPatientByMRN = async (req, res) => {
    try {
        const { mrn } = req.params;

        // Find patient by MRN and clinicId
        const patient = await Patient.findOne({ mrn, clinicId: req.user.id });

        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found or unauthorized" });
        }

        res.status(200).json({ success: true, patient });

    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const searchServices = async (req, res) => {
    try {
        const { name } = req.query; // Service name from frontend search input

        if (!name) {
            return res.status(400).json({ success: false, message: "Service name is required" });
        }

        const services = await Service.find({ name: { $regex: name, $options: "i" }, clinicId: req.user.id }) // Case-insensitive search

        if (!services.length) {
            return res.status(404).json({ success: false, message: "No matching services found" });
        }

        res.status(200).json({ success: true, services });

    } catch (error) {
        console.error("Error searching services:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const addServiceToPatient = async (req, res) => {
    try {
        const { mrn, serviceName, quantity } = req.body;
        const clinicId = req.user.id;  // Extract clinic ID from logged-in user

        // Find the service based on name and clinic ID
        const service = await Service.findOne({ name: serviceName, clinicId });

        if (!service) {
            return res.status(404).json({ message: "Service not found in this clinic" });
        }

        let patientService = await PatientServices.findOne({ mrn, clinicId });

        if (!patientService) {
            // If patient does not exist, create a new entry
            patientService = new PatientServices({
                mrn,
                clinicId,
                addedServices: [{ 
                    serviceId: service._id, 
                    quantity, 
                    totalPrice: service.price * quantity
                }],
            });
        } else {
            // Check if service already exists
            const existingService = patientService.addedServices.find(s => s.serviceId.equals(service._id));

            if (existingService) {
                existingService.quantity += quantity;  // Increment quantity
                existingService.totalPrice = existingService.quantity * service.price;
            } else {
                patientService.addedServices.push({
                    serviceId: service._id,
                    quantity,
                    totalPrice: service.price * quantity
                });
            }
        }

        await patientService.save();
        return res.status(200).json({ message: "Service added successfully", patientService });
    } catch (error) {
        res.status(500).json({ message: "Error adding service", error });
    }
};

export const deleteServiceFromPatient = async (req, res) => {
    try {
        const { mrn, serviceName } = req.body;

        if (!mrn || !serviceName) {
            return res.status(400).json({ success: false, message: "MRN and service name are required" });
        }

        // Find the service ID using the service name
        const service = await Service.findOne({ name: serviceName, clinicId: req.user.id });

        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        const serviceId = service._id; // Extract the service ID

        // Find the patient services record
        const patientService = await PatientServices.findOne({ mrn, clinicId: req.user.id });

        if (!patientService) {
            return res.status(404).json({ success: false, message: "Patient services record not found" });
        }

        // Find the service in the addedServices array
        const serviceIndex = patientService.addedServices.findIndex(svc => svc.serviceId.toString() === serviceId.toString());

        if (serviceIndex === -1) {
            return res.status(404).json({ success: false, message: "Service not found in patient's record" });
        }

        // Remove the service from the array
        patientService.addedServices.splice(serviceIndex, 1);

        // Save the updated patient service record
        await patientService.save();

        res.status(200).json({ 
            success: true, 
            message: "Service removed successfully", 
            updatedServices: patientService.addedServices 
        });

    } catch (error) {
        console.error("Error deleting service from patient:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const generateBill = async (req, res) => {
    try {
        const { mrn } = req.body;
        const clinicId = req.user.id; // Assuming authenticated user's clinic ID

        if (!mrn) {
            return res.status(400).json({ success: false, message: "MRN is required" });
        }

        // Fetch Clinic Details
        const clinic = await Clinic.findById(clinicId);
        if (!clinic) {
            return res.status(404).json({ success: false, message: "Clinic not found" });
        }

        // Fetch Patient Details
        const patient = await Patient.findOne({ mrn, clinicId });
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Fetch Patient's Services
        const patientServices = await PatientServices.findOne({ mrn, clinicId });
        if (!patientServices || patientServices.addedServices.length === 0) {
            return res.status(404).json({ success: false, message: "No services found for this patient" });
        }

        // Extract Service IDs
        const serviceIds = patientServices.addedServices.map(s => s.serviceId);

        // Fetch Service Details
        const services = await Service.find({ _id: { $in: serviceIds }, clinicId });

        if (!services.length) {
            return res.status(404).json({ success: false, message: "No valid services found" });
        }

        // Organize services into categories and calculate subtotal
        let subtotal = 0;
        let categorizedServices = {};

        patientServices.addedServices.forEach(patientService => {
            const service = services.find(s => s._id.toString() === patientService.serviceId.toString());

            if (service) {
                if (!categorizedServices[service.category]) {
                    categorizedServices[service.category] = [];
                }

                const serviceItem = {
                    name: service.name,
                    quantity: patientService.quantity,
                    rate: service.price, // Assuming service price is stored
                    total: patientService.totalPrice // Using pre-calculated total price
                };

                subtotal += patientService.totalPrice;
                categorizedServices[service.category].push(serviceItem);
            }
        });

        // Apply discount logic (if any)
        const discount = 100; // Example static discount
        const payableAmount = subtotal - discount;

        // Generate Bill Data
        const billData = {
            hospital: {
                name: clinic.name,
                address: clinic.address,
                email: clinic.email,
                phone: clinic.phone
            },
            invoice: {
                number: `INV${Math.floor(1000 + Math.random() * 9000)}`, // Random invoice number
                date: new Date().toISOString().split("T")[0],
                type: "Out-patient Bill"
            },
            patient: {
                mrn: patient.mrn,
                name: `${patient.firstName} ${patient.lastName}`,
                age: patient.age,
                gender: patient.gender
            },
            services: categorizedServices,
            totals: {
                subtotal,
                discount,
                payableAmount
            }
        };

        res.status(200).json({ success: true, message: "Bill generated successfully", bill: billData });

    } catch (error) {
        console.error("Error generating bill:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// export const updateServiceQuantity = async (req, res) => {
//     try {
//         const { mrn, serviceName, quantity } = req.body;
//         const clinicId = req.user.id; // Get clinicId from the logged-in user

//         // Find the service by name and clinicId
//         const service = await Service.findOne({ name: serviceName, clinicId });
//         if (!service) {
//             return res.status(404).json({ message: "Service not found in this clinic" });
//         }

//         // Find the patient service record
//         const patientService = await PatientServices.findOne({ mrn, clinicId });
//         if (!patientService) {
//             return res.status(404).json({ message: "Patient services not found" });
//         }

//         // Find the specific service in the addedServices array
//         const serviceToUpdate = patientService.addedServices.find(s => s.serviceId.equals(service._id));

//         if (!serviceToUpdate) {
//             return res.status(404).json({ message: "Service not found for this patient" });
//         }

//         // Update quantity and total price
//         serviceToUpdate.quantity = quantity;
//         serviceToUpdate.totalPrice = quantity * service.price;

//         await patientService.save();
//         return res.status(200).json({ message: "Service quantity updated successfully", patientService });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating service quantity", error });
//     }
// };


