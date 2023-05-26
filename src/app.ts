import express from "express";
import routes from "./routes/ProjectRouter";

const port = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta: ${port}`);
});
