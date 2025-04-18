// Export all API services from a single point
export * from './api';
export * from './authService';
export * from './receptionService';
export * from './doctorService';
export * from './nurseService';
export * from './labService';
export * from './inventoryService';
export * from './billingService';
export * from './clinicAdminService';

// You can also export the default api instance
import api from './api';
export default api;
