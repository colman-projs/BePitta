const express = require('express');
const bodyParser = require('body-parser');
const clientDb = require('./controllers/client');
const routes = require('./routes');
const connectDB = require('./db/connect');
const cors = require('./middleware/cors');
const { setIo } = require('./globals');

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

//Set routes
app.use(routes);

const onStartup = async () => {
    connectDB(URI);

    // clientDb.deleteClients();

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );

    io.on('connect', function (socket) {
        let clientId = null;
        clientDb.createClient(Date.now()).then(result => {
            clientId = result;
            socket.emit('id', clientId);
            io.sockets.emit('updateClients');
        });

        socket.on('screen', function (screen) {
            clientDb.updateClient(clientId, {
                screenId: screen,
            });
            io.sockets.emit('updateClients');
        });

        socket.on('disconnect', function () {
            clientDb.updateClient(clientId, {
                disconnected: Date.now(),
            });
            io.sockets.emit('updateClients');
        });
    });
};

onStartup();
