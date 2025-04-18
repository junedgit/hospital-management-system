import api from './api';

// Patient Registration Services
export const newPatientRegistration = async (patientData) => {
  try {
    const response = await api.post('/receptionist/patient/add-patient', patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Patient Admission Services
export const admitPatient = async (admissionData) => {
  try {
    const response = await api.post('/receptionist/patientMaster/admit/admit-patient', admissionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Appointment Services
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/receptionist/patientMaster/appointment/book-appointment', appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Patient Services
export const getPatientServices = async () => {
  try {
    const response = await api.get('/receptionist/service/all-services');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addPatientService = async (serviceData) => {
  try {
    const response = await api.post('/receptionist/service/add-service', serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Referral Services
export const addReferral = async (referralData) => {
  try {
    const response = await api.post('/receptionist/referral/add-referral', referralData);
    return response.data;
  } catch (error) {
    console.error('API Error in addReferral:', error);
    throw error.response?.data || error.message || 'Failed to add referral';
  }
};

export const editReferral = async (id, referralData) => {
  try {
    const response = await api.put(`/receptionist/referral/edit-referral/${id}`, referralData);
    return response.data;
  } catch (error) {
    console.error('API Error in editReferral:', error);
    throw error.response?.data || error.message || 'Failed to edit referral';
  }
};

export const getReferral = async (id) => {
  try {
    const response = await api.get(`/receptionist/referral/get-referral/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error in getReferral:', error);
    throw error.response?.data || error.message || 'Failed to get referral';
  }
};

export const getAllReferrals = async () => {
  try {
    const response = await api.get('/receptionist/referral/all-referrals');
    return response.data;
  } catch (error) {
    console.error('API Error in getAllReferrals:', error);
    throw error.response?.data || error.message || 'Failed to get referrals';
  }
};
