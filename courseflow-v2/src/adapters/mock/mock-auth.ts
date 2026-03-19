import jwt from "jsonwebtoken";
import type { User } from "../../models/user.model.js";

export interface TokenPayload{
    userId: string,
    email: string,
}

/**
 * A small helper function that reads JWT_SECRET from the environment and throws immediately if its missing.
 */
function getSecret(): string{
    const secret = process.env.JWT_SECRET;

    if(!secret){
        throw new Error("JWT_SECRET is not defined. check your .env file.");
    }

    return secret;
}


/**
 * Takes a user object and returnes a signed JWT string
 */

export function generateToken(user: User): string{
    const payload: TokenPayload = {
        userId: user.id,
        email: user.email,
    };

    return jwt.sign(payload, getSecret(), {expiresIn: "7d"});
}

/**
 * Takes a JWT string and returns the decoded TokenPayLoad
 * Throws if the token is invalid, expired, or tampered with
 */
export function verifyToken(token: string): TokenPayload{
    const decoded = jwt.verify(token, getSecret());
    return decoded as TokenPayload;
}