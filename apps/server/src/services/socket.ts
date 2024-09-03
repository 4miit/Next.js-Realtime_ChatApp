import { Server } from "socket.io";
import Redis from "ioredis";

const publisher = new Redis({
  host: "caching-12ad186-amitkumarrvm123-d3c2.c.aivencloud.com",
  port: 27010,
  username: "default",
  password: "AVNS_liyX_UpkpzFijV3wNIC",
});
const subscriber = new Redis({
  host: "caching-12ad186-amitkumarrvm123-d3c2.c.aivencloud.com",
  port: 27010,
  username: "defaul",
  password: "AVNS_liyX_UpkpzFijV3wNIC",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("init socket service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    subscriber.subscribe("MESSAGES");
  }

  public initListners() {
    const io = this.io;
    console.log("Init socket Listeners...");

    io.on("connect", (socket) => {
      console.log(`new socket connected `, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message Received", message);

        await publisher.publish('MESSAGES', JSON.stringify({message}));
      });
    });
    subscriber.on('messages', (channel,message) => {
      if(channel==='MESSAGES'){
        io.emit('messages',message)
      }
    } )
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
