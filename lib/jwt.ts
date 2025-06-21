import { sign, verify } from 'jsonwebtoken';

// Log environment variables (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment check:');
  console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('NODE_ENV:', process.env.NODE_ENV);
}

// Create a server-side JWT config
const createServerJwtConfig = () => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Validate JWT_SECRET format
  if (JWT_SECRET.length < 8) {
    console.error('JWT_SECRET is too short');
    throw new Error('JWT_SECRET must be at least 8 characters long');
  }

  return {
    secret: JWT_SECRET,
    sign: (payload: any) => {
      try {
        return sign(payload, JWT_SECRET, { expiresIn: '24h' });
      } catch (error) {
        console.error('Error signing JWT:', error);
        throw new Error('Failed to sign JWT token');
      }
    },
    verify: (token: string) => {
      try {
        return verify(token, JWT_SECRET);
      } catch (error) {
        console.error('Error verifying JWT:', error);
        throw new Error('Invalid or expired token');
      }
    }
  };
};

// Create a client-side JWT config
const createClientJwtConfig = () => ({
  secret: '',
  sign: () => {
    throw new Error('JWT operations are not available on the client side');
  },
  verify: () => {
    throw new Error('JWT operations are not available on the client side');
  }
});

// Export the appropriate config based on environment
export const jwtConfig = typeof window === 'undefined' 
  ? createServerJwtConfig()
  : createClientJwtConfig(); 