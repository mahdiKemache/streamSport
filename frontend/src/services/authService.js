import { api } from './api';

export const authService = {
  async loginAdmin(username, password) {
    return api.post('/auth/login', { username, password });
  },

  getToken() {
    return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  },

  setToken(token) {
    localStorage.setItem('adminToken', token);
    sessionStorage.setItem('adminToken', token);
    window.dispatchEvent(new Event('admin-auth-change'));
  },

  clearToken() {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    window.dispatchEvent(new Event('admin-auth-change'));
  },
};
