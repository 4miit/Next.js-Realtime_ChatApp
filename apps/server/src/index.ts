import http from "http";
import SocketService from "./services/socket";

async function init() {
  const ServiceSocket = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  ServiceSocket.io.attach(httpServer);

  httpServer.listen(PORT, () =>
    console.log(`http server is started at PORT : ${PORT}`)
  );

  ServiceSocket.initListners();
}

init();
