const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//import routes 

const postRoutes = require('./route/post');
const authRoutes = require('./route/auth')


// app 
const app = express() 

// db 
mongoose.connect(process.env.DATABASE, {

} )
.then(() => console.log('DB Connected!'))
.catch(err => console.log(err) ); 

// middlewares 
app.use(cors())
app.use(morgan('dev')) //
app.use(bodyParser.json()) ;

//sessionid
var cookieParser = require('cookie-parser');
var session = require('express-session')
app.use(cookieParser());
app.use(session({
    secret: 'justforfundontknowit',
    resave: false,
    saveUninitialized: true
}));

// route middlewares 
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use((err, req, res, next) => {  if (err.name === 'UnauthorizedError') {    res.status(401).json({"error" : "Please Login and get Token!"})  }})


// route or endpoint or incoming request
// app.get('*', (req, res) => {
//     res.json({
//         data : 'You reached nodejs api for react node crud app new'
//     })

// }) //* mean any endpoint *


// port 
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))


