import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
//might need to install pg... i think i have that globally?, if something is not working, that might be it
//also maybe double check that you can use import syntax --> seems that this is what babel-cli is for!

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
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Person.hasMany(Post);
Post.belongsTo(Person);

//seed the database with a bunch of stuff, the npm module faker is perdy cool!
Conn.sync({force: true})
.then(() => {
  _.times(10, () => {
    Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    })
    .then((person) => {
      person.createPost({
        title: `Sample post by ${person.firstName} ${person.lastName}`,
        content: Faker.lorem.paragraph()
      })
    })
  })
})

export default Conn