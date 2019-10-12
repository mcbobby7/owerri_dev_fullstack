const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const GraphqlSchema = require('./graphql/schema/index');
const GraphqlResolver = require('./graphql/resolver/index');
const isAuth = require('./middleware/is-auth');
const Cors = require('cors');
const path = require('path')

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(Cors());

app.use('/grapghql', graphqlHTTP({
        schema: GraphqlSchema,
        rootValue: GraphqlResolver,
        graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000; 

mongoose.connect(`mongodb+srv://bobby:1234@cluster0-lc4fu.mongodb.net/gql?retryWrites=true&w=majority`).then( () => {
    app.listen(PORT, () => {
        console.log(`listening in port ${PORT}`);
    });
} ).catch(err => {
    console.log(err);
});
