import api from './api';

// Test Parameters Services
export const getAllTestParameters = async () => {
  try {
    const response = await api.get('/lab/test-parameters/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTestParameterById = async (id) => {
  try {
    const response = await api.get(`/lab/test-parameters/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addTestParameter = async (parameterData) => {
  try {
    const response = await api.post('/lab/test-parameters/add', parameterData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTestParameter = async (id, parameterData) => {
  try {
    const response = await api.put(`/lab/test-parameters/${id}`, parameterData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lab Tests Services
export const getAllLabTests = async () => {
  try {
    const response = await api.get('/lab/tests/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getLabTestById = async (id) => {
  try {
    const response = await api.get(`/lab/tests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addLabTest = async (testData) => {
  try {
    const response = await api.post('/lab/tests/add', testData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateLabTest = async (id, testData) => {
  try {
    const response = await api.put(`/lab/tests/${id}`, testData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Lab Reports Services
export const getAllLabReports = async () => {
  try {
    const response = await api.get('/lab/reports/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getLabReportById = async (id) => {
  try {
    const response = await api.get(`/lab/reports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addLabReport = async (reportData) => {
  try {
    const response = await api.post('/lab/reports/add', reportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateLabReport = async (id, reportData) => {
  try {
    const response = await api.put(`/lab/reports/${id}`, reportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
