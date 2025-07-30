import express from "express";
import next from "next";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: __dirname });
const handle = app.getRequestHandler();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = express();

  // Serve static files from the .next directory
  server.use('./', express.static(join(__dirname, '.next')));

  // Let Next.js handle all other routes
  server.all('*', async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.status(500).send('Internal Server Error');
    }
  });

  server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
