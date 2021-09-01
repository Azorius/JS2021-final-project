require('dotenv').config();
require('./configs/passport-config');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fs = require('fs').promises;
const path = require('path');
const { createFolderIfNotExist } = require('./helpers/fileSystem');
const { usersRouter, postsRouter } = require('./routes/api');

const PORT = process.env.PORT || 3000;
const TEMP_DIR = path.join(process.cwd(), process.env.TEMP_DIR);
const POSTS_IMG_DIR = path.join(__dirname, '/public', 'pictures');

const app = express();

// Middlewares
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routing
app.get("/private", (req, res) => {
  if (!req.cookies.token) return res.status(401).send();
  res.status(200).json({ secret: "Ginger ale is a specific Root Beer" });
});
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use((_, res) => {
  res.status(404).json({ status: 'error', code: '404', message: 'Not found' });
});

// Error handler
app.use((err, _, res, __) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
  });
});

// Starting server
app.listen(PORT, async () => {
  try {
    await createFolderIfNotExist(TEMP_DIR);
    await createFolderIfNotExist(POSTS_IMG_DIR);
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(`Error with file system: ${error}`);
  }
});

// On app termination from command line
process.on('SIGINT', () => {
  console.log('Server terminated');
  process.exit(1);
});
