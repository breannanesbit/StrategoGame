import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const cors = require('cors');
const port = 2002;
const dataFile = 'data.json';

app.use(express.json());

app.use(cors());


app.post('/stratego-api/:user/board/:gameID', (req: Request, res: Response) => {
  const { user, gameID } = req.params;
  const board = req.body.board;

  if (!user || !gameID || !board) {
    return res.status(400).send('Invalid request data');
  }

  let data: { [key: string]: any } = {};

  // let data = {};
  // if (fs.existsSync(dataFile)) {
  //   data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  // }

  if (!data[user]) {
    data[user] = {};
  }

  data[user][gameID] = { board };
  fs.writeFileSync(dataFile, JSON.stringify(data));
  res.json({ message: 'Board saved successfully' });
});

// Endpoint to save a default board
app.post('/stratego-api/default/:user', (req, res) => {
  const { user } = req.params;
  const key = req.query.key as string;
  const boards = req.body.boards;

  if (!boards) {
    return res.status(400).send('Invalid request data');
  }

  let data: { [key: string]: any } = {};
  // let data = {};
  // if (fs.existsSync(dataFile)) {
  //   data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  // }


  data[key] = { boards };
  fs.writeFileSync(dataFile, JSON.stringify(data));
  res.json({ message: 'Default board saved successfully' });
});

// Endpoint to get all default boards for a user
app.get('/stratego-api/:user/default', (req, res) => {
  const { user } = req.params;

  if (!user) {
    return res.status(400).send('Invalid request data');
  }

  let data: { [key: string]: any } = {};

  // let data = {};
  // if (fs.existsSync(dataFile)) {
  //   data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  // }

  const userBoards = data[user] || {};
  res.json(userBoards);
});

app.post('/stratego-api/user', (req: Request, res: Response) => {
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

app.get('/stratego-api/user', (req: Request, res: Response) => {
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

app.delete('/stratego-api/user', (req: Request, res: Response) => {
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