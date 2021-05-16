import { Router, Request, Response, NextFunction } from "express";
import validateSignup from "../controllers/signupvalidation";
import { firebaseConfig } from "../firebaseConfig";

