/*
 
  password-hash is a node.js library to simplify use of hashed passwords.
 
  Storing passwords in plain-text is bad. This library makes the
  storing of passwords (and subsequent validation of) hashed passwords
  a bit easier.
 
  password-hash provides functions for generating a hashed passwords
  and verifying a plain-text password against a hashed password.
  For a bit of added strength, a random salt is generated when the
  password is hashed. The hashed password contains both the
  cryptographic algorithm that was used as well the salt, so all
  that is needed to verify a plain-text password is the hashed
  password itself.
 */
var passwordHash = require('password-hash');

var Sequelize = require('sequelize');

// See http://sequelize.readthedocs.org/en/latest/api/sequelize/ for
// information about the Sequelize class
var sequelize = new Sequelize(
    'database_name',  
    'username', 
    'password', 
    { dialect: "sqlite" ,
      /*
      dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
      host: 'localhost',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      */
      // SQLite only
      storage: 'database.sqlite'
    }
);

/* Or much better:
  var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
*/
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    sequelize
      .sync({ force: true })
      .then(function(err) {
        console.log('It worked!');
        var user = User.build({
          username: 'john-doe',
          password: passwordHash.generate('i-am-so-great')
        })

        user.save().then(function() {
          console.log('john-doe saved');
          User
            .find({ where: { username: 'john-doe' } })
            .then(function(err, johnDoe) {
              if (!err) {
                console.log('No user with the username "john-doe" has been found. '+err);
              } else {
                console.log('Hello ' + err.username + '!');
                console.log('All attributes of john:', err.get());
              }
            });
        },
        /* else */ function(err) {
          console.log('ERROR: john-doe not saved');
        });
      }, /* else */ function (err) { 
        console.log('An error occurred while creating the table:', err);
      });

  }, /* else */ function (err) { 
    console.log('Unable to connect to the database:', err);
  });

