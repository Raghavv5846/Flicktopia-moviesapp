const express=require('express');
const app=express();
const dotenv = require("dotenv");
dotenv.config();
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const passportLocal=require('./config/passport_local');
const MongoStore = require('connect-mongo');
let User=require('./models/user');
let Watch=require('./models/watchlist');
const middleware=require('./config/middleware');
const cors=require('cors');
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['https://flicktopia-moviesapp-l481yl8ct-raghavv5846.vercel.app',"http://localhost:3000"]; // Replace with the desired URL
        const isAllowed = allowedOrigins.includes(origin) || !origin;
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
    
}));
app.use((req, res, next) => {
// console.log(req.sessionID,"sessiosnsnsns");

    res.header('Access-Control-Allow-Origin',"https://flicktopia-moviesapp-l481yl8ct-raghavv5846.vercel.app");
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
  });
app.use(express.json());
app.use(cookieParser());
// console.log("cookie parser");
    app.use(session({
        name:'flicktopia',
        secret:'blahsomething',
        saveUninitialized:true,
        resave:false,
        cookie:{
            maxAge:(1000*30*10*10),
            secure:true,
        },
        store: MongoStore.create(
            {
                mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@flicktopia.np3wnm1.mongodb.net/`,
                collectionName:"sessions",
                autoRemove: 'interval'
            
            },
            function(err){
                console.log(err ||  'connect-mongodb setup ok');
            }
        )
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);
app.post('/checklist',passport.checkAuthentication,async (req,res)=>{
    
    let watch = await Watch.findOne({user:req.user._id});
    let isthere = watch.list.find(e=> e.id===parseInt(req.body.id));
    
    if(isthere){
        return res.send({status:"included"})
    }
    return res.send({status:"not"})

});
app.post('/remove',passport.checkAuthentication,async (req,res)=>{
    let id=req.body.removeId;
   
    let watch=await Watch.findOne({user:req.user.id});
    if(watch)
    {
        watch.list.splice(id,1);
        watch.save();
    }
    return res.send({status:"success"});
})
app.get('/list',passport.checkAuthentication,async (req,res)=>{
    let watch =await Watch.findOne({user:req.user.id});
    
    return res.send({status:"success",list:watch.list});

});
app.get('/logout',passport.checkAuthentication,async (req,res)=>{
    req.logout(()=>{
        
    });


    return res.send({status:"success"});
})
app.get('/protected',passport.checkAuthentication,async (req,res)=>{
    const allowedOrigins = ['http://localhost:3000', 'https://flicktopia-moviesapp-l481yl8ct-raghavv5846.vercel.app/']; // Add your allowed origins here
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

let list = await Watch.findOneAndUpdate({user:req.user.id},{});
list.list.push(req.body);
list.save();

return res.send({status:"success"});

}
)
app.post('/sign-in/create',async (req,res)=>{
    
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

app.post('/sign-in/create-session',passport.authenticate('local'),(req,res)=>{
        
        res.status(200).json({ status: 'success'});
    }
  );
  

// app.listen(8000,(err)=>{
//     if(err){
//         console.log('Error in Listening on port 8000',err);
//     }
//     console.log("succesfully connected to port 8000");
// })
