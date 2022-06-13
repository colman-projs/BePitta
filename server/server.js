const express = require('express');
const bodyParser = require('body-parser');
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
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

setIo(io);

const { setIoForUser } = require('./socket_logic');

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

const onStartup = async () => {
    connectDB(URI);

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );

    setIoForUser();
};

onStartup();
