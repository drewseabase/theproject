import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getAdapter } from "../config/adapter-registry.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { generateToken } from "../adapters/mock/mock-auth.js";
import { mockUsers } from "../adapters/mock/seed-data/users.js";
import type { User } from "../models/user.model.js";

const router = Router();

/**
 * strips passwordHash before sending user to client
 * 
 * Centralized here so it can't be forgotten 
 */
function sanitizeUser(user: User): Omit<User, "passwordHash">{
    const {passwordHash: _removed, ...safeUser} = user;
    return safeUser;
}

/**
 * POST /api/auth/login
 * 
 * Body: {email: string, password: string}
 * 
 * Flow:
 *  1. Validate that email and password are present
 *  2. Call adapter.authenticate() - handles bcrypt comparison
 *  3. Return token + sanitized user on success
 *  4. Return 401 failure
 */

router.post("/login", async(req: Request, res: Response): Promise<void> => {

    if(!req.body || typeof req.body !== "object"){
        res.status(400).json({
            error: "BadRequest",
            message: "Request body is required",
        });
        return;
    }

    const {email, password} = req.body;

    /*Basic input validation*/

    if(!email || !password){
        res.status(401).json({
            error: "BadRequest",
            message: "Email and password are required.",
        });
        return;
    }

    if(typeof email !== "string" || typeof password !== "string"){
        res.status(400).json({
            error: "BadRequest",
            message: "Email and password must be strings."
        });
        return;
    }

    /*Attempt authentication through the adapter*/

    try{
        const adapter = getAdapter();
        const {token, user} = await adapter.authenticate(email, password);

        //Return token and sanitized user
        res.status(200).json({
            token,
            user: sanitizeUser(user),
        });
    }catch (err){
        //Authentication failed - return 401
        console.error("[auth/login] Authentication failed:", err);
        res.status(401).json({
            error: "Unauthorized",
            message: "Invalid email or password.",
        });
    }
});

/**
 * POST /api/auth/register
 * 
 * Body: {email: string, password: string, displayName: string}
 * 
 * Flow: 
 *  1. Validate all required fields
 *  2. Check if email already exists
 *  3. Hash password with bcrypt
 *  4. Create new user object and push to mockUsers
 *  5. Generate a JWT and return token + sanitized user
 */
router.post("/register", async (req: Request, res: Response): Promise<void> =>{
    
    const {email, password, displayName} = req.body;

    //Validate required fields
    if(!email || !password || !displayName){
        res.status(400).json({
            error: "BadRequest",
            message: "Email, password, and displayName are all required.",
        });
        return;
    }

    if(typeof email !== "string" || typeof password !== "string" || typeof displayName !== "string"){
        res.status(400).json({
            error: "BadRequest",
            message: "All fields must be strings.",
        });
        return;
    }

    if(password.length < 8){
        res.status(400).json({
            error: "BadRequest",
            message: "Password must be at least 8 characters long.",
        });
        return;
    }

    //Check for existing email
    const existingUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if(existingUser){
        res.status(409).json({
            error: "Conflict",
            message: "An account with that email already exists.",
        });
        return;
    }

    try{
        //Hash the psasword
        const passwordHash = await bcrypt.hash(password, 10);

        //Build and store new user
        const newUser: User = {
            id: uuidv4(),
            email: email.toLowerCase(),
            displayName: displayName.trim(),
            passwordHash,
            enrolledCourseIds: [],
            createdAt: new Date(),
        };

        //Push to the in-memory array - the "database" for now
        mockUsers.push(newUser);

        console.log(`[auth/register] New user registered: ${newUser.email} (${newUser.id})`);

        //Generate Token and return
        const token = generateToken(newUser);

        res.status(201).json({
            token,
            user: sanitizeUser(newUser),
        });
    } catch(err){
        console.error("[auth/register] Registration Failed:", err);
        res.status(500).json({
            error: "InternalServerError",
            message: "Registration failed. Please try again.",
        });
    }
});

/**
 * GET /api/auth/me (protected)
 * 
 * No body required - identity comes from JWT via middleware
 * 
 * Flow
 *  1. requireAuth middleware runs first, verifies token, attaches req.user = {userId, email}
 *  2. Look up full user record by userId
 *  3. Return sanitized user profile
 */
router.get("/me", requireAuth, async (req: Request, res: Response): Promise<void> => {

    //requireAuth already verified the token - req.user is garunteed here
    const {userId} = req.user!;

    //Look up full user record
    const user = mockUsers.find((u) => u.id === userId);

    if(!user){
        //Means the token was valid but user no longer exists
        res.status(404).json({
            error: "NotFound",
            message: "User account not found.",
        });

        return;
    }
    res.status(200).json({
        user: sanitizeUser(user),
    });
});

export default router
