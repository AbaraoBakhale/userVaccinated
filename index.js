const http=require('http');
const app=require("./app");
const server=http.createServer(app);

server.listen(3200,console.log("running  http://localhost:3200"));