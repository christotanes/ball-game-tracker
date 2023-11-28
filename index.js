import express from 'express';
import matchRoute from './route/match.js'
import 'dotenv/config'

const app = express();
const port = `${process.env.PORT}`

app.use(express.static('public'))

app.use("/", matchRoute)

app.listen(port, () => console.log(`Server running at port ${port}`));