import api from './api';

// OP Assessment Services
export const getAllOPAssessments = async () => {
  try {
    const response = await api.get('/nurse/op-assessment/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOPAssessmentById = async (id) => {
  try {
    const response = await api.get(`/nurse/op-assessment/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addOPAssessment = async (assessmentData) => {
  try {
    const response = await api.post('/nurse/op-assessment/add', assessmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateOPAssessment = async (id, assessmentData) => {
  try {
    const response = await api.put(`/nurse/op-assessment/${id}`, assessmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// IP Care Management Services
export const getAllIPCareManagements = async () => {
  try {
    const response = await api.get('/nurse/ip-care-management/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getIPCareManagementById = async (id) => {
  try {
    const response = await api.get(`/nurse/ip-care-management/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addIPCareManagement = async (careData) => {
  try {
    const response = await api.post('/nurse/ip-care-management/add', careData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateIPCareManagement = async (id, careData) => {
  try {
    const response = await api.put(`/nurse/ip-care-management/${id}`, careData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Admission Notes Services
export const getAllAdmissionNotes = async () => {
  try {
    const response = await api.get('/nurse/admission-notes/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAdmissionNoteById = async (id) => {
  try {
    const response = await api.get(`/nurse/admission-notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addAdmissionNote = async (noteData) => {
  try {
    const response = await api.post('/nurse/admission-notes/add', noteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAdmissionNote = async (id, noteData) => {
  try {
    const response = await api.put(`/nurse/admission-notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
