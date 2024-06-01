import express, { Router } from "express";


import { sendmessage } from "../controller/messagecontroller.js";
const router = new Router();
router.post("/send", sendmessage);

export default router;
