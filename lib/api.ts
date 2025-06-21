import axios from 'axios';

// Get the current port from the window location
const API_URL = typeof window !== 'undefined' 
  ? `${window.location.protocol}//${window.location.host}/api`
  : 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData: { 
    email: string; 
    password: string; 
    name: string;
    role: 'DONOR' | 'ORGANIZATION' | 'VOLUNTEER' | 'ADMIN';
  }) => {
    try {
      console.log('Making registration request to:', `${API_URL}/auth/register`);
      console.log('Registration data:', { ...userData, password: '[REDACTED]' });
      
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      
      if (response.data) {
        // If we get a token in the response, store it
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userRole', response.data.user.role);
          console.log('Token and role stored successfully');
        } else {
          console.warn('No token received in response');
        }
        return response.data;
      }
      throw new Error('No data received from server');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.data?.error) {
        throw { error: error.response.data.error };
      }
      if (error.message === 'Network Error') {
        throw { error: 'Unable to connect to the server. Please check your internet connection.' };
      }
      throw { error: 'Registration failed. Please try again.' };
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Making login request');
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        console.log('Login successful');
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.data?.error) {
        throw { error: error.response.data.error };
      }
      if (error.message === 'Network Error') {
        throw { error: 'Unable to connect to the server. Please check your internet connection.' };
      }
      throw { error: 'Login failed. Please try again.' };
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      console.log('Logged out successfully');
    }
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      return { token, role };
    }
    return { token: null, role: null };
  }
};

// Campaign services
export const campaignService = {
  getAllCampaigns: async () => {
    try {
      const response = await api.get('/campaigns');
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },

  createCampaign: async (campaignData: {
    title: string;
    description: string;
    targetAmount: number;
    endDate: string;
    image?: string;
    organizationId: string;
  }) => {
    try {
      const response = await api.post('/campaigns', campaignData);
      return response.data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  },
};

export default api; 