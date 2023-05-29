import express from "express";
import projectRouter from "./routes/ProjectRouter";
import { CacheProvider } from "./providers/CacheProvider";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      secure: true,
      maxAge: 1800000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(projectRouter);

CacheProvider.getInstance().initialize(process.env.REDIS_URL as string);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta: ${port}`);
});
