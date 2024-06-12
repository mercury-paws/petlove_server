import express from 'express';

const server = express();
const PORT = 3000;

export default function setupServer() {
  server.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
