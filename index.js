const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const dotenv = require("dotenv");
dotenv.config();
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local');
const MongoStore = require('connect-mongo');
let User=require('./models/user');
let Watch=require('./models/watchlist');
const cors=require('cors');
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://example.com',"http://localhost:3000"]; // Replace with the desired URL
      const isAllowed = allowedOrigins.includes(origin) || !origin;
  
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
app.use(express.json());
    app.use(cookieParser());

    app.use(session({
        name:'flicktopia',
        // todo change the secret before deployment in production mode
        secret:'blahsomething',
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:(1000*30*10)
        },
        store: MongoStore.create(
            {
                mongoUrl: `mongodb+srv://raghavpareek5846:Raghav%405846@flicktopia.np3wnm1.mongodb.net/?retryWrites=true&w=majority`,
                autoRemove: 'disabled'
            
            },
            function(err){
                console.log(err ||  'connect-mongodb setup ok');
            }
        )
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);
app.get('/logout',passport.checkAuthentication,async (req,res)=>{
    req.logout(()=>{
        
    });


    return res.send({status:"success"});
})
app.get('/protected',passport.checkAuthentication,async (req,res)=>{
    const allowedOrigins = ['http://localhost:3000', 'https://flicktopia-moviesapp.vercel.app/']; // Add your allowed origins here
  const requestOrigin = req.get('origin');

  if (allowedOrigins.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  } else {
    // Handle unauthorized origin
    return res.status(403).send('Unauthorized origin');
  }


    return res.send({user:res.locals.user.name,status:"success"})
})
app.post('/add',passport.checkAuthentication,async (req,res)=>{
const {id}=req.body;
console.log(req.body);
let list = await Watch.findOne({user:req.user.id});
list.list.push(id);
list.save();
console.log(list);
return res.send({status:"success"});

}
)
app.post('/sign-in/create',async (req,res)=>{
    console.log(req.body);
    if (req.body.password != req.body.confirm_password){
        console.log("wrong pass");
        return res.status(404).send('wrong');
        return res.redirect('back');
    }

    let user= await User.findOne({email: req.body.email})
        if (!user){
            let user= await User.create(req.body);
            await Watch.create({user:user});
            console.log("user created succesfyllu");
            return res.status(200).send({status:"success"});
        return res.redirect('back');

        }else{
            console.log("users already registred");
            return res.status(400).send('wrong');
        return res.redirect('http://localhost:3000/');

        }
});
app.post('/sign-in/create-session',passport.authenticate(
    'local',
    {failureRedirect: 'http://localhost:3000/sign-up'},
), (req,res)=>{
    console.log("logged in successfully",req.sessionID);
    res.status(200).send({status:"success"});
});

app.listen(8000,(err)=>{
    if(err){
        console.log('Error in Listening on port 8000',err);
    }
    console.log("succesfully connected to port 8000");
})