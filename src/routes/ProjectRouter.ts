import express, { Request, Response } from "express";

const routes = express.Router();

routes.post("/files", () => console.log("running routes"));

export default routes;
