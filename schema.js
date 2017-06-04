import {GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLList, 
  GraphQLSchema,
  GraphQLNonNull} from 'graphql';

import db from './db';

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(person) {
          return person.id
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(person) {
          return person.firstName
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(person) {
          return person.lastName
        }
      },
      email: {
        type: GraphQLString,
        resolve(person) {
          return person.email
        }
      },
      posts:  {
        type: new GraphQLList(Post),
        resolve(person) {
          return person.getPosts();
        }
      }
    }
  }
})

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post',
  fields: ()=> {
    return {
      id: {
        type: GraphQLInt,
        resolve(post) {
          return post.id
        }
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title
        }
      },
      content: {
        type: GraphQLString,
        resolve(post) {
          return post.content
        }
      },
      person: {
        type: Post,
        resolve(post) {
          post.getPerson();
        }
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        args: {//this part is to limit what arguments users can send to the database
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return db.models.person.findAll({where: args})
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(root, args) {
          return db.models.post.findAll({where: args})
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields: () => {
    return {
      addPerson: {
        type: Person,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_,args) {
          return db.modals.person.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase(),
          })
        }
      }
    }
  }
})

const Schema = new GraphQLSchema({
  mutation: Mutation,
  query: Query
});

export default Schema;