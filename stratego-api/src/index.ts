import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const port = 2002;
const dataFile = 'data.json';

app.use(express.json());

app.post('/stratego-api/myApi', (req: Request, res: Response) => {
  const key = req.query.key as string;
  const value = req.body;

  if (!key) return res.status(400).send('Key is required as a query parameter');

  let data: { [key: string]: any } = {};

  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  }

  data[key] = value;

  fs.writeFileSync(dataFile, JSON.stringify(data));
  res.json({ message: 'Data stored successfully' });
});

app.get('/stratego-api/myApi', (req: Request, res: Response) => {
  const key = req.query.key as string;

  if (!key) return res.status(400).send('Key is required');

  if (fs.existsSync(dataFile)) {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    if (data[key]) {
      return res.json(data[key]);
    }
  }
  res.status(404).send('Key not found');
});

app.delete('/stratgeo-api/myApi', (req: Request, res: Response) => {
  const key = req.query.key as string;

  if (!key) return res.status(400).send('Key is required');

  if (fs.existsSync(dataFile)) {
    let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    if (data[key]) {
      delete data[key];
      fs.writeFileSync(dataFile, JSON.stringify(data));
      return res.send('Data deleted successfully');
    }
  }

  res.status(404).send('Key not found');
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});