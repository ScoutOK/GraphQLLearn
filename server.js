import Express from 'express';
import Graphttp from 'express-graphql';

import Schema from './schema';

//config
const APP_PORT = 3000;

const app = Express();

app.use('/graphql', Graphttp({
  schema: Schema,
  pretty: true,
  graphiql: true
}))

app.listen(APP_PORT, () => {
  console.log(`it lives!!! on port ${APP_PORT}`)
})