import express, { Router } from "express";


import { sendmessage } from "../controller.js/messagecontroller.js";
const router = new Router();
router.post("/send", sendmessage);

export default router;
