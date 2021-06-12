
require ('./config/mongoose');

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({type:"application/json"}))
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/api',routes);

app.get('', (req, res) => {
  return res.send("Server is up and running")
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  console.log(err)
   return res.status(500).send({
    errorCode:500,
    errMessage: "Some thing went wrong please try again later."
  });
});
const server = app.listen(SERVER_PORT,()=>{
  console.log(`Server Started and running on port  ${SERVER_PORT}`)
})

export default server;