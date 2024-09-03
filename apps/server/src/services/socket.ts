import { Server } from "socket.io";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();


const publisher = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
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
