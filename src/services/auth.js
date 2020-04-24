const jwt = require('jsonwebtoken');

exports.createToken = async (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' });
}

exports.authorize = function (req, res, next) {
  
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
};

exports.isAdministrator = function (req, res, next) {
  if(!req.headers.authorization){
    return res.status(401).json({error: 'Access denied'});
  }
  
  const token = req.headers.authorization.split(' ')[1] || null;
    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                   if (decoded.user.roles.includes('admin')) {
                    next();
                } else {
                        res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};

