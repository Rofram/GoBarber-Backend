export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: "1d",
  },
};