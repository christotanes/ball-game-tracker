import express from 'express';
import matchRoute from './route/match.js'
const app = express();
const port = 3000;

// app.use(express.static('public'))

app.use("/", matchRoute)

app.listen(port, () => console.log(`Server running at port ${port}`));