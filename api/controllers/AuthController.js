const mongoose = require('mongoose'),
  jwt          = require('jsonwebtoken'),
  User         = mongoose.model('User'),
  config       = require('../config/Config'),
  Validations       = require('../utils/Validations'),
  ROLES        = require('../config/Roles').ROLES;


module.exports.signup = async (req, res) => {
  if (!Validations.isValidUser(req.body)) {
    return res.status(422).json({
      err: null,
      msg: 'Not Valid User Info',
      data: null
    });
  }
  const newUser = new User();
  newUser.name = req.body.fullName;
  newUser.email = req.body.email;
  newUser.password = newUser.generateHash(req.body.password);
  newUser.role = req.body.role?
    (((req.body.role === ROLES.admin) || (req.body.role === ROLES.manager) || (req.body.role === ROLES.viewer))?
      req.body.role : ROLES.admin) : ROLES.admin;

  newUser.save().then(user => {
    console.log('Registered');
    const payload = {
      id: user._id,
      name: user.name,
      role: user.role
    };
    const token = jwt.sign(payload, config.SECRET, {expiresIn:'48h'});
    res.status(200).json({
      data: {   token : token   }
    });
  });
};

module.exports.login = async (req, res) => {
  User.find({email:req.body.email}).then(users => {
    for (const user of users) {
      if(user.validPassword(req.body.password))
      {
        const payload = {
          id: user._id,
          name: user.name,
          role: user.role
        };
        const token = jwt.sign(payload, config.SECRET, {expiresIn:'48h'});
        return res.status(200).json({
          data: {token : token}
        });
      }
    }
    res.status(403).json({
      error : {message: 'Not Found'}
    });
  });
};

module.exports.logout = async (req, res) => {
  res.status(200).json({});
};
