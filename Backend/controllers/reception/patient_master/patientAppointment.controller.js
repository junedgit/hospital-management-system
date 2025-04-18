import Doctor from "../../../models/clinicAdmin/masterDataConfig/doctor/doctor.model.js";
import Appointment from "../../../models/reception/patient_master/patientAppointment.model.js";

export const getDoctorsByDepartment = async (req, res) => {
    try {
        const { department, date } = req.query;

        if (!department || !date) {
            return res.status(400).json({ message: "Department and date are required" });
        }

        const doctors = await Doctor.find({ department, clinicId: req.user.id });

        const doctorData = await Promise.all(
            doctors.map(async (doctor) => {
                const appointments = await Appointment.find({
                    doctorId: doctor._id,
                    date: new Date(date),
                    clinicId: req.user.clinicId,
                });

                const bookedSlots = appointments.map((app) => ({
                    from: app.from,
                    to: app.to,
                }));

                return {
                    doctor,
                    bookedSlots,
                };
            })
        );

        res.status(200).json(doctorData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, patientId, patientName, date, from, to, typeOfAppointment } = req.body;

        if (!doctorId || !patientId || !date || !from || !to || !typeOfAppointment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const doctor = await Doctor.findOne({ _id: doctorId, clinicId: req.user.id });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        // Check if appointment is within doctor's working hours
        if (from < doctor.timing.inTime || to > doctor.timing.outTime) {
            return res.status(400).json({ message: "Appointment is outside doctor's working hours" });
        }

        // Fetch all appointments for the given doctor on the same date
        const existingAppointments = await Appointment.find({
            doctorId,
            date,
            clinicId: req.user.clinicId,
        });

        // Check for conflicts
        const isConflict = existingAppointments.some(
            (app) => from < app.to && to > app.from
        );

        if (isConflict) {
            return res.status(400).json({ message: "Slot is already booked" });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            doctorId,
            patientId,
            patientName,
            date,
            from,
            to,
            typeOfAppointment,
            clinicId: req.user.id,
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rescheduleAppointment = async (req, res) => {
    try {
        const {appointmentId} = req.params;
        const { newDate, newFrom, newTo } = req.body;

        if (!appointmentId || !newDate || !newFrom || !newTo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const appointment = await Appointment.findOne({ _id: appointmentId, clinicId: req.user.id });
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        const doctor = await Doctor.findOne({ _id: appointment.doctorId, clinicId: req.user.id });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        // Ensure new time is within doctor's working hours
        if (newFrom < doctor.timing.inTime || newTo > doctor.timing.outTime) {
            return res.status(400).json({ message: "New time is outside doctor's working hours" });
        }

        // Check for slot conflicts
        const existingAppointments = await Appointment.find({
            doctorId: appointment.doctorId,
            date: newDate,
            clinicId: req.user.clinicId,
        });

        const isConflict = existingAppointments.some(
            (app) => newFrom < app.to && newTo > app.from
        );

        if (isConflict) {
            return res.status(400).json({ message: "New slot is already booked" });
        }

        // Update the appointment
        appointment.date = newDate;
        appointment.from = newFrom;
        appointment.to = newTo;
        await appointment.save();

        res.status(200).json({ message: "Appointment rescheduled successfully", appointment });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        if (!appointmentId) return res.status(400).json({ message: "Appointment ID is required" });

        const appointment = await Appointment.findOneAndDelete({ _id: appointmentId, clinicId: req.user.id });
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({ message: "Appointment cancelled successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
