import api from './api';

// OP Queue Services
export const getOPQueue = async () => {
  try {
    const response = await api.get('/doctor/op-queue/get-queue');
    return response.data;
  } catch (error) {
    console.error('Error fetching OP queue:', error);
    throw error.response?.data || error.message || 'Failed to fetch OP queue';
  }
};

export const getPatientDetails = async (patientId) => {
  try {
    const response = await api.get(`/doctor/op-queue/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient details for ID ${patientId}:`, error);
    throw error.response?.data || error.message || 'Failed to fetch patient details';
  }
};

export const saveMedicalForm = async (patientId, formData) => {
  try {
    const response = await api.post(`/doctor/op-queue/medical-form/${patientId}`, formData);
    return response.data;
  } catch (error) {
    console.error(`Error saving medical form for patient ID ${patientId}:`, error);
    throw error.response?.data || error.message || 'Failed to save medical form';
  }
};

export const prescribeMedication = async (patientId, medicationData) => {
  try {
    const response = await api.post(`/doctor/op-queue/prescribe/${patientId}`, medicationData);
    return response.data;
  } catch (error) {
    console.error(`Error prescribing medication for patient ID ${patientId}:`, error);
    throw error.response?.data || error.message || 'Failed to prescribe medication';
  }
};

// IP Dashboard Services
export const getIPDashboard = async () => {
  try {
    const response = await api.get('/doctor/ip-dashboard/get-dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching IP dashboard:', error);
    throw error.response?.data || error.message || 'Failed to fetch IP dashboard';
  }
};

export const getAdmittedPatientDetails = async (patientId) => {
  try {
    const response = await api.get(`/doctor/ip-dashboard/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching admitted patient details for ID ${patientId}:`, error);
    throw error.response?.data || error.message || 'Failed to fetch admitted patient details';
  }
};

export const updatePatientStatus = async (patientId, statusData) => {
  try {
    const response = await api.put(`/doctor/ip-dashboard/update-status/${patientId}`, statusData);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient status for ID ${patientId}:`, error);
    throw error.response?.data || error.message || 'Failed to update patient status';
  }
};
