import { createServer } from "http";
import { env } from "process";
import app from "./app";
import db from "./db";

const server = createServer(app);
// start the server.

server.listen(env.SERVER_PORT, () => {
  console.log(`Server is running on port ${env.SERVER_PORT}`);
});

process.on("SIGTERM", async () => {
  await db.close();
  server.close(() => {
    console.log("Server closed");
  });
  process.exit(0);
});
