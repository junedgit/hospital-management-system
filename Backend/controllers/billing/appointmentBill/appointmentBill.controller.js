import AppointmentBill from "../../../models/billing/appointmentBill/appointmentBill.model.js";
import Appointment from "../../../models/reception/patient_master/patientAppointment.model.js";
import InvoiceNumber from "../../../models/superAdmin/invoiceNumber.model.js";
import Patient from "../../../models/reception/new_patient_reg/newPatient.model.js";
import Clinic from "../../../models/superAdmin/clinic.model.js";
import ConsultationPrint from "../../../models/clinicAdmin/masterDataConfig/printSettings/consultationPrint/consultationPrint.model.js";
import Doctor from "../../../models/clinicAdmin/masterDataConfig/doctor/doctor.model.js";

export const generateAppointmentInvoice = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const clinicId = req.user.id; // Assuming user is clinic admin

        // Fetch appointment bill details
        const appointment = await Appointment.findOne({ _id : appointmentId,clinicId : clinicId});
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Fetch clinic details
        const clinic = await Clinic.findById(clinicId);
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }

        // Fetch invoice details
        const invoice = await InvoiceNumber.findOne({ clinicId });
        if (!invoice) {
            return res.status(404).json({ message: "Invoice details not found" });
        }

        // Fetch patient details

        const patient = await Patient.findOne({ _id : appointment.patientId });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Fetch invoice design settings
        const printSettings = await ConsultationPrint.findOne({ clinicId });
        if (!printSettings) {
            return res.status(404).json({ message: "Print settings not found" });
        }

        // Extract settings
        const { fontSize, spaceBetweenLines } = printSettings.basicSettings;
        const { type: headerType, text: headerText, imageUrl: headerImage } = printSettings.bannerHeading.headerBanner;
        const { type: footerType, text: footerText, imageUrl: footerImage } = printSettings.footerBanner.footerBanner;

        const doctor = await Doctor.findOne({ _id: appointment.doctorId, clinicId: req.user.id });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        // Calculate amounts
        const totalAmount = parseFloat(doctor.consultationFee);
        const discount = 100.00;
        const gst = 0.18 * totalAmount;
        const payableAmount = totalAmount - discount + gst;

        const appointmentBill = new AppointmentBill({
            mrn: patient.mrn,
            clinicDetails: {
                name: clinic.clinicName,
                email: clinic.email,
                address: clinic.address,
                phone: clinic.phone_number,
            },
            invoiceDetails: {
                invoiceNumber: invoice.invoiceNumber,
                date: new Date(),
                type: "Appointment",
            },
            patientDetails: {
                name: patient.givenName + " " + patient.middleName + " " + patient.familyName,
                age: patient.age,
                gender: patient.gender,
                mrn: patient.mrn,
            },
        });

        // Save appointment bill
        await appointmentBill.save();

        const newInvoiceNumber = await InvoiceNumber.findOneAndUpdate(
            { clinicId },
            { $inc: { invoiceNumber: 1 } },
            { new: true }
        );
        newInvoiceNumber.save();
        
        // Generate invoice HTML
        const invoiceHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Appointment Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: ${fontSize || '14px'};
                    line-height: ${spaceBetweenLines || '1.5'};
                    margin: 0;
                    padding: 0;
                }
                .invoice-container {
                    width: 100%;
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .header {
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                    ${headerType === "Image" ? `background: url('${headerImage}') no-repeat center; background-size: contain; height: 100px;` : ''}
                }
                .footer {
                    padding: 10px 0;
                    margin-top: 20px;
                    border-top: 1px solid #eee;
                    text-align: center;
                    font-size: 12px;
                    ${footerType === "Image" ? `background: url('${footerImage}') no-repeat center; background-size: contain; height: 50px;` : ''}
                }
                .hospital-info {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .hospital-logo {
                    width: 60px;
                    height: 60px;
                    background-color: #00a884;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    font-weight: bold;
                    margin-right: 15px;
                }
                .hospital-details {
                    flex-grow: 1;
                }
                .hospital-name {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 0;
                }
                .hospital-address {
                    font-size: 13px;
                    color: #555;
                    margin: 2px 0;
                }
                .hospital-contact {
                    font-size: 13px;
                    color: #555;
                    display: flex;
                    align-items: center;
                }
                .hospital-contact a {
                    color: #00a884;
                    text-decoration: none;
                    margin-right: 15px;
                }
                .invoice-info {
                    text-align: right;
                    font-size: 13px;
                }
                .invoice-info p {
                    margin: 5px 0;
                }
                .patient-info {
                    margin: 20px 0;
                    padding: 15px 0;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                }
                .patient-detail {
                    display: inline-block;
                    margin-right: 25px;
                }
                .patient-label {
                    color: #666;
                    margin-right: 5px;
                }
                .billing-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                .billing-table th {
                    background-color: #f8f9fa;
                    text-align: left;
                    padding: 12px;
                    font-weight: 600;
                }
                .billing-table td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                }
                .amount-column {
                    text-align: right;
                }
                .summary-row {
                    text-align: right;
                }
                .summary-row td {
                    padding: 8px 12px;
                    border-bottom: none;
                }
                .summary-label {
                    font-weight: normal;
                }
                .payable-amount {
                    font-weight: bold;
                    font-size: 16px;
                }
                .system-note {
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                    margin-top: 30px;
                }
                .print-btn {
                    display: block;
                    width: 150px;
                    margin: 30px auto 0;
                    padding: 10px;
                    background-color: #00a884;
                    color: white;
                    text-align: center;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .print-btn:hover {
                    background-color: #008f72;
                }
                @media print {
                    .print-btn {
                        display: none;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    ${headerType === "Text" ? `<h2>${headerText}</h2>` : ''}
                </div>

                <div class="hospital-info">
                    <div class="hospital-logo">
                        <span>H</span>
                    </div>
                    <div class="hospital-details">
                        <h2 class="hospital-name">${clinic.clinicName}</h2>
                        <p class="hospital-address">${clinic.address}</p>
                        <div class="hospital-contact">
                            <a href="mailto:${clinic.email}">${clinic.email}</a>
                            <span>• ${clinic.phone_number}</span>
                        </div>
                    </div>
                    <div class="invoice-info">
                        <p><strong>Invoice number:</strong> ${invoice.invoiceNumber}</p>
                        <p><strong>Invoice date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
                        <p><strong>Type:</strong> Out-patient Bill</p>
                    </div>
                </div>

                <div class="patient-info">
                    <div class="patient-detail">
                        <span class="patient-label">Patient Name:</span>
                        <strong>${patient.givenName} ${patient.middleName || ''} ${patient.familyName}</strong>
                    </div>
                    <div class="patient-detail">
                        <span class="patient-label">Age:</span>
                        <strong>${patient.age}</strong>
                    </div>
                    <div class="patient-detail">
                        <span class="patient-label">Gender:</span>
                        <strong>${patient.gender}</strong>
                    </div>
                </div>

                <table class="billing-table">
                    <thead>
                        <tr>
                            <th>DESCRIPTION</th>
                            <th class="amount-column">TOTAL (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Consultation Fee<br>Dr. ${doctor.name || doctor.firstName + ' ' + doctor.lastName}</td>
                            <td class="amount-column">${totalAmount.toFixed(2)}</td>
                        </tr>
                        <tr class="summary-row">
                            <td colspan="2" class="summary-label">Subtotal</td>
                        </tr>
                        <tr class="summary-row">
                            <td></td>
                            <td class="amount-column">${totalAmount.toFixed(2)}</td>
                        </tr>
                        <tr class="summary-row">
                            <td colspan="2" class="summary-label">Discount</td>
                        </tr>
                        <tr class="summary-row">
                            <td></td>
                            <td class="amount-column">${discount.toFixed(2)}</td>
                        </tr>
                        <tr class="summary-row">
                            <td colspan="2" class="summary-label">GST</td>
                        </tr>
                        <tr class="summary-row">
                            <td></td>
                            <td class="amount-column">${gst.toFixed(2)}</td>
                        </tr>
                        <tr class="summary-row">
                            <td colspan="2" class="summary-label payable-amount">Payable amount</td>
                        </tr>
                        <tr class="summary-row">
                            <td></td>
                            <td class="amount-column payable-amount">${payableAmount.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="system-note">
                    <p>This is a system-generated invoice.</p>
                    <p>Please retain it for your records. Contact the billing desk for any discrepancies.</p>
                </div>

                <button class="print-btn" onclick="window.print()">Print Invoice</button>
            </div>

            <div class="footer">
                ${footerType === "Text" ? `<p>${footerText}</p>` : ''}
            </div>
        </body>
        </html>
        `;

res.send(invoiceHtml); // Sending HTML directly

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
