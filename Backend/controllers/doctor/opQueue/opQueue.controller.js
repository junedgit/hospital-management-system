import OPQueue from "../../../models/doctor/opQueue/opQueue.model.js";
import Appointment from "../../../models/reception/patient_master/patientAppointment.model.js";
import Patient from "../../../models/reception/new_patient_reg/newPatient.model.js";
import Doctor from "../../../models/clinicAdmin/masterDataConfig/doctor/doctor.model.js";

//The apis in this module are a little tricky to work with respect to the frontend
//We will modify these as per the needs of the frontend dev
//We have tried to keep the apis with respect to the views of the frontend dev, but still this
//has been a little tricky to work with and any changes can be done later

//Also note if u need some specific apis which u may not see here
//make sure to check the respective schemas 
//for example : the api for searching the drug + quantity is written in stockEntry.route.js

// Utility function to format time
const formatTime = (date) => date.toISOString().split("T")[0];

// Get today's appointments
export const getTodaysAppointments = async (req, res) => {
    try {
        const clinicId = req.user.id;
        const today = new Date();
        const todayStr = formatTime(today);

        // Fetch today's appointments
        const appointments = await Appointment.find({
            clinicId: clinicId,
            date: todayStr
        });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments for today" });
        }

        // Fetch patient details
        const patientIds = appointments.map(appt => appt.patientId);
        const patients = await Patient.find({ _id: { $in: patientIds } });

        // Map appointments with patient details
        const result = appointments.map(appt => {
            const patient = patients.find(p => p._id.equals(appt.patientId));
            return {
                time: `${appt.from} - ${appt.to}`,
                status: appt.status,
                id : appt._id,
                mrn: patient?.mrn || "N/A",
                name: patient?.givenName +" "+ patient?.middleName+" " + patient?.familyName || "N/A",
                age: patient?.age || "N/A",
                phoneNumber: patient?.phone || "N/A",
                gender: patient?.gender || "N/A"
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get future & past appointments (excluding today)
export const getOtherAppointments = async (req, res) => {
    try {
        const clinicId = req.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of the day

        // Fetch only future appointments (date > today)
        const appointments = await Appointment.find({
            clinicId: clinicId,
            date: { $gt: today } // Only future dates
        });

        if (!appointments.length) {
            return res.status(404).json({ message: "No future appointments" });
        }

        // Fetch patient details
        const patientIds = appointments.map(appt => appt.patientId);
        const patients = await Patient.find({ _id: { $in: patientIds } });

        // Map appointments with patient details
        const result = appointments.map(appt => {
            const patient = patients.find(p => p._id.equals(appt.patientId));
            return {
                time: `${appt.from} - ${appt.to}`,
                date: appt.date.toISOString().split('T')[0], // Extract YYYY-MM-DD
                id : appt._id,
                status: appt.status,
                mrn: patient?.mrn || "N/A",
                name: patient 
                    ? `${patient.givenName || ""} ${patient.middleName || ""} ${patient.familyName || ""}`.trim()
                    : "N/A",
                age: patient?.age || "N/A",
                phoneNumber: patient?.phone || "N/A",
                gender: patient?.gender || "N/A"
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//This api if the frontend can send data in nested format the way it is in the Schema

// export const saveAndPrint = async (req, res) => {
//     try {
//         const {
//             mrn,
//             vitals,
//             symptoms,
//             allergies,
//             familyHistory,
//             surgicalHistory,
//             socialHistory,
//             examinationAndDiagnosis,
//             prescription,
//             labTests,
//             advice,
//             revisitAfter,
//         } = req.body;

//         if (!mrn || !revisitAfter || !clinicId) {
//             return res.status(400).json({ message: "MRN, revisitAfter, and clinicId are required" });
//         }

//         // Create a new OP queue entry
//         const opQueueEntry = new OPQueue({
//             mrn,
//             vitals,
//             symptoms,
//             allergies,
//             familyHistory,
//             surgicalHistory,
//             socialHistory,
//             examinationAndDiagnosis,
//             prescription,
//             labTests,
//             advice,
//             revisitAfter,
//             clinicId:req.user.id,
//         });

//         // Save to the database
//         await opQueueEntry.save();

//         // Return the saved data
//         res.status(201).json({ message: "OP queue entry saved successfully", opQueueEntry });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// This api if frontend cannot send data in nested format
export const saveAndPrint = async (req, res) => {
    try {
        const {
            mrn,
            height,
            weight,
            bloodPressure,
            heartRate,
            temperature,
            SPO2,
            BMI,
            symptoms,
            typeOfAllergy,
            allergyNote,
            familyHistory,
            surgicalHistory,
            smoking,
            drinking,
            socialHistoryNote,
            examinationNote,
            ICDCode,
            diagnosis,
            diagnosisNote,
            prescription,
            labTests,
            advice,
            revisitAfter,
            appointmentId // Added appointmentId
        } = req.body;

        if (!mrn || !revisitAfter || !appointmentId) {
            return res.status(400).json({ message: "MRN, revisitAfter, and appointmentId are required" });
        }

        // Fetch the appointment details to get doctorId
        const appointment = await Appointment.findOne({_id : appointmentId,clinicId : req.user.id});
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Fetch doctor details using doctorId
        const doctorId = appointment.doctorId;
        const doctor = await Doctor.findOne({_id : doctorId, clinicId : req.user.id});
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Construct the vitals object
        const vitals = { height, weight, bloodPressure, heartRate, temperature, SPO2, BMI };

        // Construct allergies object
        const allergies = { typeOfAllergy, note: allergyNote };

        // Construct family history
        const formattedFamilyHistory = familyHistory?.map(fh => ({
            familyMember: fh.familyMember,
            medicalIssue: fh.medicalIssue,
            diagnosedOn: fh.diagnosedOn,
            remark: fh.remark
        })) || [];

        // Construct surgical history
        const formattedSurgicalHistory = surgicalHistory?.map(sh => ({
            surgery: sh.surgery,
            dateOfSurgery: sh.dateOfSurgery,
            reason: sh.reason
        })) || [];

        // Construct social history
        const formattedSocialHistory = [{ smoking, drinking, note: socialHistoryNote }];

        // Construct examination and diagnosis object
        const examinationAndDiagnosis = { examinationNote, ICDCode, diagnosis, note: diagnosisNote };

        // Construct prescription
        const formattedPrescription = prescription?.map((p, index) => ({
            sNo: index + 1,
            drug: p.drug,
            dosage: p.dosage,
            frequency: p.frequency,
            duration: p.duration
        })) || [];

        // Construct lab tests
        const formattedLabTests = labTests || [];

        // Create the new OP Queue entry
        const opQueueEntry = new OPQueue({
            mrn,
            vitals,
            symptoms,
            allergies,
            familyHistory: formattedFamilyHistory,
            surgicalHistory: formattedSurgicalHistory,
            socialHistory: formattedSocialHistory,
            examinationAndDiagnosis,
            prescription: formattedPrescription,
            labTests: formattedLabTests,
            advice,
            revisitAfter,
            clinicId: req.user.id
        });

        // Save the OP Queue entry
        await opQueueEntry.save();

        // Update the appointment status to "Completed"
        appointment.status = "Completed";
        await appointment.save();

        res.status(201).json({
            message: "OP queue entry saved successfully",
            opQueueEntry,
            doctorName: doctor.name // Sending doctor name in response
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

