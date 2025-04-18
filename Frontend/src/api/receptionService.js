// import api from './api';

// export const newPatientRegistration = async () => {
//   try {
//     const response = await api.post('/reception/new-patient-registration');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const admitPatient = async (clinicData) => {
//   try {
//     const response = await api.post('/reception/admit-patient', clinicData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
// export const bookAppointment = async (clinicData) => {
//   try {
//     const response = await api.post('/reception/book-appointment', clinicData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
// export const patientMaster = async (clinicData) => {
//   try {
//     const response = await api.post('/reception/book-appointment', clinicData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
// export const patientRecord = async (clinicData) => {
//   try {
//     const response = await api.post('/reception/book-appointment', clinicData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
// export const addReferral = async (clinicData) => {
//   try {
//     const response = await api.post('/referral/add-referral', clinicData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
// export const editReferral = async (id, clinicData) => {
//   try {
//     const response = await api.put(`/referral/edit-referral/${id}`, clinicData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
// export const getReferral = async (id) => {
//   try {
//     const response = await api.get(`/referral/get-referral/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const allReferrals = async () => {
//   try {
//     const response = await api.get('/referral/all-referrals');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
