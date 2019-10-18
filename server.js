const express = require('express');
const express_graphql = require('express-graphql');
const User = require('./User');
const {buildSchema} = require('graphql');
// GraphQL schema
const schema = buildSchema(`
    type Query {
        user(id: Int!): User
        users(topic: String): [User]
        addUser(user: UserInput): User
            }
    type User {
        id: Int
        name: String
        lastName: String
        description: String
        skills: String
        url: String
    }
    input UserInput {
        name: String
        lastName: String
        description: String
        skills: String
        url: String
    }
`);
const usersData = [
    {
        id: 1,
        name: 'Pepe',
        lastName: 'Argento',
        description: 'Estudiante!',
        skills: 'doblar tapitas con el pupo',
        url: 'www.facebook.com/elgorodopepe'
    },
    {
        id: 2,
        name: 'Mimi',
        lastName: 'Torreda',
        description: 'Programadora!',
        skills: 'programar en php, osea nada',
        url: 'www.facebook.com/mimiQueMiras?'
    },
    {
        id: 3,
        name: 'Esteban',
        lastName: 'Quito',
        description: 'Profesor!',
        skills: 'Tolerar estudiantes pelotudos',
        url: 'www.facebook.com/elprofe'
    },
    {
        id: 4,
        name: 'Mario',
        lastName: 'Bross',
        description: 'Fontanero!',
        skills: 'Salvar princesas',
        url: 'www.facebook.com/noSoyLuigi'
    },
    {
        id: 5,
        name: 'Dolores',
        lastName: 'Fonzi',
        description: 'Actriz',
        skills: 'Fumar de la buena, hacer buenas pizzas',
        url: 'www.facebook.com/noSoyLuigi'
    },
    {
        id: 6,
        name: 'Diego',
        lastName: 'Maradona',
        description: 'Ex futbolista',
        skills: 'Hacer goles con los pelos de las chivos, tomar merluza',
        url: 'www.facebook.com/noSoyLuigi'
    }
];
const getUser = function (args) {
    const id = args.id;
    return usersData.filter(user => {
        return user.id === id;
    })[0];
};
const getUsers = function (args) {
    if (args.topic) {
        const topic = args.topic;
        return usersData.filter(user => user.topic === topic);
    } else {
        return usersData;
    }
};

const addUser = function (args) {

    let user = new User(args);
    user.id = usersData.length + 1;
    usersData.push(user);
    return user
};

const root = {
    user: getUser,
    users: getUsers,
    addUser: addUser
};


// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));