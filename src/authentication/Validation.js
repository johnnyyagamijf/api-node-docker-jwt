const jwt = require('jsonwebtoken');

module.exports.createToken = (user) => {
  return jwt.sign({user}, process.env.SECRET_KEY, {
      expiresIn: '1d',
      tim
      
  });
 }

module.exports.validToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json({error: 'Access denied'});
  }
  
  const token = req.headers.authorization.split(' ')[1] || null;

  if(!token){
    return res.status(404).json({erro: 'Token not found'});
  }
   jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
   if(err){
       return res.status(401).json({message: 'Invalid token'});
   }
   next();
  })
}
