import express from "express";
import routes from "./routes/ProjectRouter";
import { CacheProvider } from "./providers/CacheProvider";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// Start cache server
CacheProvider.getInstance().initialize(process.env.REDIS_URL as string);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta: ${port}`);
});
