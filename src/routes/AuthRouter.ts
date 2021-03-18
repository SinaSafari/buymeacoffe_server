import express from "express";

import AuthController from "../controllers/AuthController";

const router = express.Router();

router.post("/login", async (req, res) => {
  const controller = new AuthController();
  const response = await controller.Login(req.body);
  return res.send(response);
});

router.post("/register", async (req, res) => {
  const controller = new AuthController();
  const response = await controller.Register(req.body);
  return res.send(response);
});

export default router;
