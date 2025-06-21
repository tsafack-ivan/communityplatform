import { jwtConfig } from './jwt';

export function verifyToken(req, roles = []) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new Error('No token provided');
  const token = auth.split(' ')[1];
  const payload = jwtConfig.verify(token);
  if (roles.length && !roles.includes(payload.role)) {
    throw new Error('Forbidden');
  }
  return payload;
}

export function verifyAdmin(req) {
  return verifyToken(req, ['ADMIN']);
}

export function verifyAdminOrNGO(req) {
  return verifyToken(req, ['ADMIN', 'ORGANIZATION']);
} 