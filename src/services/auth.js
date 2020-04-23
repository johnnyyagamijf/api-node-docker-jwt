const jwt = require('jsonwebtoken');

exports.createToken = async (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' });
}

exports.verifyToken = async (token) => {
    var data = await jwt.verify(token, process.env.SECRET_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
  
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
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