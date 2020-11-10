import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { HelloResolver } from './resolvers/hello';
import { MikroORM } from '@mikro-orm/core';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { __prod__ } from './constants';
import {buildSchema} from 'type-graphql';
import express from "express";
import microConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(microConfig);    
  await orm.getMigrator().up();
  
  
  const app = express();
  const apolloServer =  new ApolloServer({
      schema: await buildSchema({
          resolvers: [HelloResolver, PostResolver, UserResolver],
          validate: false,
      }),
      context: () =>({ em: orm.em })
  });
  
apolloServer.applyMiddleware({ app });
  
  app.listen(4000, () => {
    console.log('server start on localhost:4000');
  })
  
};

main().catch(err => {
     console.error(err)   
});
