const mongoose = require('mongoose'),
  jwt          = require('jsonwebtoken'),
  User         = mongoose.model('User'),
  config       = require('../config/Config');


module.exports.signup = async (req, res) => {
  const newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = newUser.generateHash(req.body.password);

  newUser.save().then(user => {
    console.log('Registered');
    const payload = {
      id: user._id,
      admin: user.admin
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
          admin: user.admin
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
  jwt.verify(req.headers['x-access-token'], config.SECRET, function(err, decoded) {
    if (err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      console.log(decoded);

    }
  });
};
