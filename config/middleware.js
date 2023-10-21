module.exports.setHeaders=(req,res,next)=>{
    const allowedOrigins = ['http://localhost:3000', 'https://flicktopia-moviesapp.vercel.app/']; // Add your allowed origins here
  const requestOrigin = req.get('origin');
  console.log(requestOrigin,"request origin");
  if (allowedOrigins.includes(requestOrigin)) {
    console.log("header has been set");
      res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      res.header("Access-Control-Allow-Credentials", "true");
      next();
  } else {
    // Handle unauthorized origin
    return res.status(403).send('Unauthorized origin');
  }
}
