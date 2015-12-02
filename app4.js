var passwordHash = require('password-hash');

var Sequelize = require('sequelize');

var sequelize = new Sequelize('sqlite://:s@:/', { storage: 'database.sqlite'});

var User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  }
);

var Company  = sequelize.define('Company', {
    name: Sequelize.STRING
  }
);

User.belongsTo(Company, {as: 'compania'}); // Will add companiaId to user

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    sequelize
      .sync({ force: true })
      .then(function(err) {
        console.log('It worked!');

        var cocaCola = Company.build({
          name: 'CocaCola'
        });

        cocaCola.save().then(function(){
          console.log('Coca Cola saved '+cocaCola.id);
        }).then(function() {
          var user = User.build({
            username: 'john-doe',
            password: passwordHash.generate('i-am-so-great'),
            companiaId: cocaCola.id
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
        })
      }, /* else */ function(err) {
        console.log('ERROR: Coca Coal not saved '+err);
      });
      }, /* else */ function (err) { 
        console.log('An error occurred while creating the table:', err);
      });

  }, /* else */ function (err) { 
    console.log('Unable to connect to the database:', err);
  });

