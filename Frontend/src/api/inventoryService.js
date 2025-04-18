import api from './api';

// Manufacturer Services
export const getAllManufacturers = async () => {
  try {
    const response = await api.get('/inventory/manufacturer/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addManufacturer = async (manufacturerData) => {
  try {
    const response = await api.post('/inventory/manufacturer/add', manufacturerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateManufacturer = async (id, manufacturerData) => {
  try {
    const response = await api.put(`/inventory/manufacturer/${id}`, manufacturerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Supplier Services
export const getAllSuppliers = async () => {
  try {
    const response = await api.get('/inventory/supplier/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addSupplier = async (supplierData) => {
  try {
    const response = await api.post('/inventory/supplier/add', supplierData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await api.put(`/inventory/supplier/${id}`, supplierData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Drug Services
export const getAllDrugs = async () => {
  try {
    const response = await api.get('/inventory/drug/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDrugById = async (id) => {
  try {
    const response = await api.get(`/inventory/drug/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addDrug = async (drugData) => {
  try {
    const response = await api.post('/inventory/drug/add', drugData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateDrug = async (id, drugData) => {
  try {
    const response = await api.put(`/inventory/drug/${id}`, drugData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Stock Entry Services
export const getAllStockEntries = async () => {
  try {
    const response = await api.get('/inventory/stock-entry/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addStockEntry = async (stockEntryData) => {
  try {
    const response = await api.post('/inventory/stock-entry/add', stockEntryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Stock Adjustment Services
export const getAllStockAdjustments = async () => {
  try {
    const response = await api.get('/inventory/stock-adjustment/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addStockAdjustment = async (adjustmentData) => {
  try {
    const response = await api.post('/inventory/stock-adjustment/add', adjustmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Stock Migration Services
export const getAllStockMigrations = async () => {
  try {
    const response = await api.get('/inventory/stock-migration/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addStockMigration = async (migrationData) => {
  try {
    const response = await api.post('/inventory/stock-migration/add', migrationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
