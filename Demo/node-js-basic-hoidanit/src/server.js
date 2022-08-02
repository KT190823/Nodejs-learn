import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';

require('dotenv').config();
var morgan = require('morgan');

const app = express();
const port = process.env.PORT;

app.use(morgan('combined'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init API route
initAPIRoute(app);

//init web route
initWebRoute(app);

//handle 404 not found
app.use((req,res) =>{
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})