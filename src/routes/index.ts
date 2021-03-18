import express from "express";
import PingController from "../controllers/Ping";
import UserRouter from "./userRrouter";
import AuthRouter from "./AuthRouter";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);

export default router;
