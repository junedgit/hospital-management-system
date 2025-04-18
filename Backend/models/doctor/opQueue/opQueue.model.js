import mongoose from "mongoose";

const opQueueSchema = new mongoose.Schema({
    mrn: {
        type: String,
        required: true,
    },
    vitals : {
        bloodPressure : {
            type : String,
        },
        heartRate : {
            type : Number,
        },
        temperature : {
            type : Number,
        },
        SPO2 : {
            type : String,
        },
        height : {
            type : Number,
        },
        weight : {
            type : Number,
        },
        BMI : {
            type : Number,
        },
    },
    symptoms : {
        type : [String],
    },
    allergies : {
        typeOfAllergy : {
            type : String,
        },
        note : {
            type : String,
        }
    },
    familyHistory : [
        {
            familyMember : {
                type : String,
            },
            medicalIssue : {
                type : String,
            },
            diagnosedOn : {
                type : Date,
            },
            remark : {
                type : String,
            }
        }
    ],
    surgicalHistory : [
        {
            surgery : {
                type : String,
            },
            dateOfSurgery : {
                type : Date,
            },
            reason : {
                type : String,
            }
        }
    ],
    socialHistory : [
        {
            smoking : {
                type : String,
                enum : ["Yes","No","In the past"]
            },
            drinking : {
                type : String,
                enum : ["Yes","No","In the past"]
            },
            note : {
                type : String,
            },
        }
    ],
    examinationAndDiagnosis : {
        examinationNote : {
            type : [String],
        },
        ICDCode : {
            type : String,
        },
        diagnosis : {
            type : String,
        },
        note : {
            type : String,
        }
    },
    prescription : [
        {
            sNo : {
                type : Number
            },
            drug : {
                type : String,
            },
            dosage : {
                type : String,
            },
            frequency : {
                type : String,
            },
            duration : {
                type : String,
            }
        }
    ],
    labTests : {
        type : [String],
    },
    advice : {
        type : String,
    },
    revisitAfter : {
        type : String,
        required : true,
    },
    clinicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Clinic",
        required : true,
    }
});

const OPQueue = mongoose.model("opQueue", opQueueSchema);

export default OPQueue;