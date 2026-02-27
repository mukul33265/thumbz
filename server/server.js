const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const session = require('express-session');
const authRouter = require('./routes/authRoutes');
const ThumbnailRouter = require('./routes/thumbnailRoutes');
const userRouter = require('./routes/userRoutes');
const MongoStore = require('connect-mongo').default;

// const PORT = process.env.PORT || 5000 ;
const DB_PATH = process.env.DB_PATH ;
const SECRET_KEY = process.env.SECRET_KEY ;

const app = express();

const store = MongoStore.create({
  mongoUrl: DB_PATH,
  collectionName: 'sessions'
});
// Middlewares
app.use(cors({
  origin : ['https://thumbz-client.vercel.app','http://localhost:5173','https://localhost:5000'],
  credentials : true 
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret : SECRET_KEY ,
  resave : false ,
  saveUninitialized : false ,
  store ,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24*7,   // 7 day
    httpOnly : true,
    secure : process.env.NODE_ENV === 'production',
    sameSite : 'none',
    path : '/'
  }
}))


// route 
app.get("/",(req,res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.send("hello taran");
})
app.use('/api/auth',authRouter);
app.use('/api/thumbnail',ThumbnailRouter)
app.use('/api/user',userRouter)
// connection to the server and database
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  // app.listen(PORT, () => {
  //   console.log(`Server running on http://localhost:${PORT}`);
  // });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});

module.exports = app;