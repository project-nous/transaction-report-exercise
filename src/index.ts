import express, { Request, Response } from "express";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import path from "path";
import transactionRoutes from "./routes/transactions";
import providerRoutes from "./routes/provider";

const liveReloadServer = livereload.createServer();

liveReloadServer.watch(path.join(__dirname, "src"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();

app.use(connectLivereload());

app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/transactions", transactionRoutes);
app.use("/provider", providerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
