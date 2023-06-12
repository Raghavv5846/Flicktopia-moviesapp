const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/user');
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true
},
    function(req, email,password,done){
        let user = User.findOne({email: email})
        .then((user)=>{
            
            // Check if the password matches the user's password.
            if (!user || user.password !== password) {
                // Password does not match.
                console.log('Password mismatch');
                return done(null, false);
            }
            // Password matches.
            console.log('Login successful');
            
            return done(null, user);
        })
        .catch((err)=>{
            console.log(err);
            return done(err);
        });

        
        }
    ));
// serializing the user to decide which key is to kept in the cookie
passport.serializeUser(function(user,done){
    console.log(user);
    done(null,user.id);
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{
        if(user){
            return done(null,user);
        }
    }).catch((err)=>{
        if(err){
            console.log("err in finding user id through passport",err);
        }
    })
});
// check i fth euser is signed in
passport.checkAuthentication=function(req,res,next){
    // if th euser is signed in then pass the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    console.log("session",req.sessionID);
    return res.send({status:"failed"});
}
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports=passport;