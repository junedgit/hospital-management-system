import mongoose from "mongoose";

//Details we can get from frontend when api is called
//doctorId, patientId, patientName, date, from, to, typeOfAppointment

const appointmentBillSchema = new mongoose.Schema({
    //Will be given from frontend when adding appointment
    mrn : {
        type : String,
    },
    //Will be fetched using req.user.id which is clinicId
    clinicDetails : {
        name : {
            type : String,
        },
        email : {
            type : String,
        },
        address : {
            type : String,
        },
        phone : {
            type : String,
        },
    },
    //will be fetched from invoice schema using clinicId
    invoiceDetails : {
        invoiceNumber : {
            type : Number,
        },
        date : {
            type : Date,
        },
        type : {
            type : String
        }
    },
    //We have mrn and using that all the patient details can be fetched
    patientDetails : {
        name : {
            type : String,
        },
        age : {
            type : Number,
        },
        gender : {
            type : String,
        }
    },
    //when appointment is clicked even doctorName will be sent from frontend
    doctorDetails : {
        name : {
            type : String,
        },
        consultationFee : {
            type : String,
        },
    },
    //to be autocalculated based on above information
    billDetails : {
        total : {
            type : Number,
        },
        discount : {
            type : Number,
        },
        gst : {
            type : Number,
        },
        payableAmount : {
            type : Number,
        }
    },
    //Seperate API to add these details - all data will be given from frontend
    paymentInfo : {
        discount : {
            type : Number,
            default : 0
        },
        payedAmount : {
            type : Number,
            default : 0
        },
        balance : {
            type : Number,
            default : 0
        },
        paymentMethod : {
            type : String,
            default : ""
        },
        transactionNo : {
            type : String,
            default : ""
        },
    }
});

const AppointmentBill = mongoose.model("AppointmentBill", appointmentBillSchema);

export default AppointmentBill;
