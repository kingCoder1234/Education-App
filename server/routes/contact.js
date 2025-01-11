import express from "express";
import { contact } from "../controllers/contact.js";

const router = express.Router();

router.post("/contactUs", contact);

export default router;
