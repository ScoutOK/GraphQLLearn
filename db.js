import Sequelize from 'sequelize';
//might need to install pg... i think i have that globally?, if something is not working, that might be it

const Conn = new Sequelize(
  'graphql',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const Person = Conn.define('person', {
    firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Person.hasMany(Post);
Post.belongsTo(Person);