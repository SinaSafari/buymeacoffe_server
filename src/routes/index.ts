import express from "express";
import PingController from "../controllers/Ping";
import UserRouter from "./user.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", UserRouter);

export default router;
