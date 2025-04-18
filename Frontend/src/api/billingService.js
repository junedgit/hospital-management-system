import api from './api';

// Appointment Billing Services
export const createAppointmentBill = async (billData) => {
  try {
    const response = await api.post('/billing/appointment-bill/create', billData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment bill:', error);
    throw error.response?.data || error.message || 'Failed to create appointment bill';
  }
};

export const getAppointmentBill = async (billId) => {
  try {
    const response = await api.get(`/billing/appointment-bill/${billId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment bill ID ${billId}:`, error);
    throw error.response?.data || error.message || 'Failed to fetch appointment bill';
  }
};

export const getAllAppointmentBills = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/billing/appointment-bill/all?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all appointment bills:', error);
    throw error.response?.data || error.message || 'Failed to fetch appointment bills';
  }
};

export const updateAppointmentBill = async (billId, billData) => {
  try {
    const response = await api.put(`/billing/appointment-bill/${billId}`, billData);
    return response.data;
  } catch (error) {
    console.error(`Error updating appointment bill ID ${billId}:`, error);
    throw error.response?.data || error.message || 'Failed to update appointment bill';
  }
};

// Payment Services
export const recordPayment = async (paymentData) => {
  try {
    const response = await api.post('/billing/payment/record', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error recording payment:', error);
    throw error.response?.data || error.message || 'Failed to record payment';
  }
};

export const getPaymentHistory = async (patientId) => {
  try {
    const response = await api.get(`/billing/payment/history/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payment history for patient ID ${patientId}:`, error);
    throw error.response?.data || error.message || 'Failed to fetch payment history';
  }
};
