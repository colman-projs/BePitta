const express = require('express');
const bodyParser = require('body-parser');
const clientDb = require('./controllers/client');
const routes = require('./routes');
const connectDB = require('./db/connect');
const cors = require('./middleware/cors');
const { setIo } = require('./globals');
const cookieParser = require('cookie-parser');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//Set the DATABASE URI
const URI =
    'mongodb+srv://BePitta:Aa123456@bepitta.cki1z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//Set the express
const app = express();

const http = require('http');
const { addUserToGroup, removeUserFromGroup } = require('./controllers/group');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

setIo(io);

//Set the port
const port = 3000;
app.use(cookieParser());
app.use(cors);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

//SWAGGER
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BePitta API with Swagger',
            version: '1.0.0',
            description: 'BePitta Library API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

//Set routes
app.use(routes);

const userLeaveGroup = (socket, groups, groupId, clientId) => {
    socket.leave(groupId);
    io.to(groupId).emit("participants-updated", --groups[groupId].members);

    // save user left group in DB
    removeUserFromGroup(groupId, clientId);
}

const onStartup = async () => {
    connectDB(URI);

    // clientDb.deleteClients();

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );

    let groups = {};

    io.on('connect', function (socket) {
        let _groupId = null;
        let _clientId = null;
        let userStartPrefernces = false;

        socket.on('group-connect', function (groupId, clientId) {

            _groupId = groupId;
            _clientId = clientId;

            if (userStartPrefernces) { // When returning from preferences screen (no new user)
                userStartPrefernces = false;
            } else {

                if (!groups[groupId]) {
                    groups[groupId] = {
                        members: 1
                    }
                } else {
                    groups[groupId].members++;
                }

                socket.join(groupId); // Connect client to group room

                // save user to group in DB
                addUserToGroup(groupId, clientId);

            }

            if (groups[groupId]) {
                io.to(groupId).emit("participants-updated", groups[groupId].members);
            }
        });

        socket.on('user-leave-group', function () {
            if (groups[_groupId] && !userStartPrefernces) {
                userLeaveGroup(socket, groups, _groupId, _clientId);
            }
        });

        socket.on('user-start-prefernces', function () {
            userStartPrefernces = true;
        });

        socket.on('disconnect', function () {
            if (groups[_groupId]) {
                userLeaveGroup(socket, groups, _groupId, _clientId);
            }
        });
    });
};

onStartup();
