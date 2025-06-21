const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function testRegistration() {
  try {
    console.log('Testing registration endpoint...');
    const response = await axios.post(`${API_URL}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'DONOR'
    });
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

async function testLogin() {
  try {
    console.log('\nTesting login endpoint...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

async function runTests() {
  try {
    await testRegistration();
    await testLogin();
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('\nTests failed:', error);
  }
}

runTests(); 