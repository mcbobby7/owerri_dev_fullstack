const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const GraphqlSchema = require('./graphql/schema/index');
const GraphqlResolver = require('./graphql/resolver/index');

const app = express();

app.use(bodyParser.json());

app.use('/grapghql', graphqlHTTP({
        schema: GraphqlSchema,
        rootValue: GraphqlResolver,
        graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0-lc4fu.mongodb.net/gql?retryWrites=true&w=majority`).then( () => {
    app.listen(5000, () => {
        console.log('listening in port 5000');
    });
} ).catch(err => {
    console.log(err);
});
