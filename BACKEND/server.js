const http = require("http");
const app = require("./app");
const config = require("./src/config/config");
const { initializeSocket } = require("./socket")

const server = http.createServer(app);

const port = config.PORT

initializeSocket(server);

server.listen(port, () =>{
    console.log(`server is running on port ${port}`);
});