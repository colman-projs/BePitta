const express = require('express');
const bodyParser = require('body-parser');
const clientDb = require('./controllers/client');
const routes = require('./routes');
const connectDB = require('./db/connect');
const cors = require('./middleware/cors');
const { setIo } = require('./globals');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//Set the DATABASE URI
const URI =
    'mongodb+srv://BePitta:Aa123456@bepitta.cki1z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//Set the express
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

setIo(io);

//Set the port
const port = 3000;

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
            description: 'BePitta Library API'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ["./routes/*.js"],

};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//Set routes

app.use(routes);





const onStartup = async () => {
    connectDB(URI);

    // clientDb.deleteClients();

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );

    let groups = {};

    io.on('connect', function (socket) {
        let _groupId = null;
        let userStartPrefernces = false;

        socket.on('group-connect', function (groupId) {

            _groupId = groupId;

            if (userStartPrefernces) {
                userStartPrefernces = false;
            } else {

                if (!groups[groupId]) {
                    groups[groupId] = {
                        members: 1
                    }
                } else {
                    groups[groupId].members++;
                }

                socket.join(groupId);

            }

            io.to(groupId).emit("participants-updated", groups[groupId].members);
        });

        socket.on('user-leave-group', function () {
            if (groups[_groupId] && !userStartPrefernces) {
                io.to(_groupId).emit("participants-updated", --groups[_groupId].members);
            }
        });

        socket.on('user-start-prefernces', function () {
            userStartPrefernces = true;
        });

        socket.on('disconnect', function () {
            if (groups[_groupId]) {
                io.to(_groupId).emit("participants-updated", --groups[_groupId].members);
            }
        });
    });
};

onStartup();
