import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Missing token');

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // console.error('JWT verify failed:', err);
      // console.log("Token:", token);
      // console.log("Secret:", process.env.JWT_SECRET);
      return res.status(403).send('Invalid token');
    }
    req.user = decoded;
    next();
  });
};



