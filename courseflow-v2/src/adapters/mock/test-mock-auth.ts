import dotenv from "dotenv";
dotenv.config();

import { generateToken, verifyToken, type TokenPayload } from "./mock-auth.js";
import type { User } from "../../models/user.model.js";
import type { Token } from "typescript";

function section(title: string){
    console.log("\n" + "=".repeat(60));
    console.log(` ${title}`);
    console.log("=".repeat(60));
}


async function runTests(){

    const fakeUser: User = {
        id: "test-user-id",
        email: "test@courseflow.dev",
        displayName: "Test User",
        passwordHash: "irrelevant-for-this-test",
        enrolledCourseIds: [],
        createdAt: new Date(),
    };

    section("TEST 1 - generateToken() returns a token");

    let token = '';

    try{
        token = generateToken(fakeUser);

        if (typeof token === 'string' && token.length > 0){
            console.log("\n PASS: Token generated successfully");
            console.log(` First 50 chars: ${token.substring(0,50)}...`);
        }else {
            console.log("\n FAIL: token was empty or wrong type")
        }
    }catch (err){
        console.error("\n generateToken() threw an error: ", err);
        return;
    }

    section("TEST 2 - Token has correct JWT structure (header.payload.signature)");

    const parts = token.split(".");

    if(parts.length === 3){
        console.log("\n PASS: Token has 3 parts (header.payload.signature)");

        
        //Decode the payload to show whats inside
        const payloadPart = parts[1];
        if(!payloadPart) throw new Error("Missing Payload");

        const rawPayload = Buffer.from(payloadPart, "base64").toString("utf-8");
        const decodedPayload = JSON.parse(rawPayload);
        console.log("\n Decoded payload (visible to anyone - never put secrets here):");
        console.log(" ", JSON.stringify(decodedPayload, null, 2));
    }else{
        console.log(`\n FAIL: expected 3 parts, got ${parts.length}`)
    }

    section("TEST 3 - verifyToken() returns correct payload");

    try {
        const payload: TokenPayload = verifyToken(token);

        if(payload.userId === fakeUser.id && payload.email == fakeUser.email){
            console.log("\n PASS: Payload matches original user data");
            console.log(`   userId: ${payload.userId}`);
            console.log(`   email: ${payload.email}`);
        }else {
            console.log("\n FAIL: Payload fields don't match");
            console.log("   Expected:", {userId: fakeUser.id, email: fakeUser.email});
            console.log("   Recieved:", payload);
        }
    }catch (err){
        console.error("\n verifyToken() threw an error:", err);
    }


    section("TEST 4 - verifyToken() rejects a tampered token");

    try{
        const tamperedToken = token.slice(0,-5) + "XXXXX";
        verifyToken(tamperedToken);
        console.log('\n FAIL: Should have thrown for tampered token');
    }catch (err){
        if(err instanceof Error){
            console.log(`\n PASS: Tampered token correctly rejected: "${err.message}"`);
        }
    }

    section("TEST 5 - verifyToken() rejects a completely fake token");

    try{
        verifyToken("this.is.fake");
        console.log("\n FAIL: should have thrown for fake token");
    }catch (err){
        if(err instanceof Error){
            console.log(`\n PASS: Fake token correctly rejected: "${err.message}"`);
        }
    }


    section("TEST 6 - passwordHash is NOT leaked into the token");

    try{
        const payload = verifyToken(token);
        if("passwordHash" in payload){
            console.log("\n FAIL: passwordHash found in token payload - security issue");
        }else{
            console.log("\n PASS: passwordHash not present in token payload");
        }
    }catch (err){
        console.error("\n verifyToken() threw unexpectedly: ", err);
    }

}

runTests().catch(console.error);
