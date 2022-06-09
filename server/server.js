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
const { groupDAL } = require('./controllers/group');
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

const userLeaveGroup = async (socket, groupId, clientId) => {

    // save user left group in DB
    groupDAL.removeUserFromGroup(groupId, clientId);
    const grp = await groupDAL.getGroupById(groupId);
    console.log(grp);

    socket.leave(groupId);
    if (grp) {
        io.to(groupId).emit("participants-updated", grp.users.length);
    }
}

const onStartup = async () => {
    connectDB(URI);

    // clientDb.deleteClients();

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );

    io.on('connect', function (socket) {
        let _groupId = null;
        let _clientId = null;

        socket.on('group-connect', async function (groupId, clientId) {

            _groupId = groupId;
            _clientId = clientId;

            // save user to group in DB
            await groupDAL.addUserToGroup(groupId, clientId);
            const grp = await groupDAL.getGroupById(groupId);

            socket.join(groupId); // Connect client to group room

            if (grp) {
                io.to(groupId).emit("participants-updated", grp.users.length);
            }
        });

        socket.on('user-leave-group', function () {
            userLeaveGroup(socket, _groupId, _clientId);
        });

        socket.on('disconnect', function () {
            userLeaveGroup(socket, _groupId, _clientId);
        });
    });
};

onStartup();
