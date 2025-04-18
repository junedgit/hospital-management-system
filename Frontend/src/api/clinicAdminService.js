import api from './api';

// User Management Services
export const getAllClinicUsers = async () => {
  try {
    const response = await api.get('/clinicAdmin/all-clinicUsers');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getClinicUserById = async (id) => {
  try {
    const response = await api.get(`/clinicAdmin/get-ClinicUser/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addClinicUser = async (userData) => {
  try {
    const response = await api.post('/clinicAdmin/add-clinicUser', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateClinicUser = async (id, userData) => {
  try {
    const response = await api.put(`/clinicAdmin/edit-clinicUser/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Department Services
export const getAllDepartments = async () => {
  try {
    const response = await api.get('/clinicAdmin/masterDataConfig/department/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addDepartment = async (departmentData) => {
  try {
    const response = await api.post('/clinicAdmin/masterDataConfig/department/add', departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Service Management
export const getAllServices = async () => {
  try {
    const response = await api.get('/clinicAdmin/masterDataConfig/service/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addService = async (serviceData) => {
  try {
    const response = await api.post('/clinicAdmin/masterDataConfig/service/add', serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Doctor Management
export const getAllDoctors = async () => {
  try {
    const response = await api.get('/ClinicAdmin/masterDataConfig/doctor/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addDoctor = async (doctorData) => {
  try {
    const response = await api.post('/ClinicAdmin/masterDataConfig/doctor/add', doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Bed Management
export const getAllBeds = async () => {
  try {
    const response = await api.get('/ClinicAdmin/masterDataConfig/bed/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addBed = async (bedData) => {
  try {
    const response = await api.post('/ClinicAdmin/masterDataConfig/bed/add', bedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Ward Management
export const getAllWards = async () => {
  try {
    const response = await api.get('/clinicAdmin/masterDataConfig/ward/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addWard = async (wardData) => {
  try {
    const response = await api.post('/clinicAdmin/masterDataConfig/ward/add', wardData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Room Management
export const getAllRooms = async () => {
  try {
    const response = await api.get('/clinicAdmin/masterDataConfig/room/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addRoom = async (roomData) => {
  try {
    const response = await api.post('/clinicAdmin/masterDataConfig/room/add', roomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Tariff Management
export const getAllTariffs = async () => {
  try {
    const response = await api.get('/clinicAdmin/masterDataConfig/tariff/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addTariff = async (tariffData) => {
  try {
    const response = await api.post('/clinicAdmin/masterDataConfig/tariff/add', tariffData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
