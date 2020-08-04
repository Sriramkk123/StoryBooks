const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const methodOverride = require('method-override');


dotenv.config({path:'./config/config.env'});
connectDB();
require('./config/passport')(passport);

const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Method Override
app.use(methodOverride(function(req,res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

if(process.env.NODE_ENV == "development")
{
    app.use(morgan('dev'));
}


//Handlebar helpers
const { formatDate,truncate,scriptTags,editIcon,select } = require('./helpers/hbs');

app.engine('.hbs',exphbs({
    helpers:{
        formatDate,
        truncate,
        scriptTags,
        editIcon,
        select,
    },
    defaultLayout: 'main' ,
    extname:'.hbs',
})
)
app.set('view engine','.hbs');

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize())
app.use(passport.session());

//Set Global User
app.use(function(req,res,next){
    res.locals.user = req.user || null
    next()
})

//Static folder
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on ${process.env.NODE_ENV} ${PORT}`));