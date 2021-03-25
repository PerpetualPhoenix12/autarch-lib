/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const novel = require('./routes/api/novel.js');

app.use('/api/novel', novel);

// Static
app.use(express.static(`${__dirname}/public/`));

// SPA Handling
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
