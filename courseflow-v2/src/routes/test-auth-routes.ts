//  This test spins a real Express server on a test port,
//  Makes real HTTP requests using the built-in fetch API
//  and shuts down cleanly when done.
//
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "http";
import authRouter from "./auth.routes.js";

const TEST_PORT = 5001;
const BASE_URL = `http://localhost:${TEST_PORT}/api/auth`;

function buildTestApp(){
    const app = express();
    app.use(express.json());
    app.use("/api/auth", authRouter);
    return app;
}

function section(title: string){
    console.log("\n" + "=".repeat);
    console.log(`   ${title}`);
    console.log("=".repeat(60));
}

async function runTests(){

    //Start test server
    const app = buildTestApp();
    let server: Server;

    await new Promise<void>((resolve)=>{
        server = app.listen(TEST_PORT, () => {
            console.log(`\nTest server running on port ${TEST_PORT}`);
            resolve();
        });
    });

    let validToken = "";

    const REAL_EMAIL = "dseabase@gmail.com";
    const REAL_PASSWORD = "BlossomRain24!";

    try{

        section("TEST 1 - POST /api/auth/login with valid credentials");

        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: REAL_EMAIL, password: REAL_PASSWORD}),
        });

        const loginBody = await loginRes.json() as any;

        if(loginRes.status === 200 && loginBody.token && loginBody.user){
            validToken = loginBody.token;
            console.log(`\n PASS: Login successful (status 200)`);
            console.log(`   Token (first 40 chars): ${validToken.substring(0,40)}...`);
            console.log(`   User returned:`, JSON.stringify(loginBody.user, null, 2));

            if("passwordHash" in loginBody.user){
                console.log("\n FAIL: passwordHash should not be in the response");
            }else{
                console.log("\n PASS: passwordHash correctly stripped from response");
            }
        }else{
            console.log(`\n FAIL: status=${loginRes.status}, body=`, loginBody);
            console.log("   -> Check that REAL_EMAIL and REAL_PASSWORD match users.ts");
        }

        section("TEST 2 - POST /api/auth/login with wrong password returns 401");

        const badLoginRes = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: REAL_EMAIL, password: "wrongPassword"}),
        });

        if(badLoginRes.status === 401){
            console.log(`\n PASS: Wrong password returned 401`);
        }else{
            console.log(`\n FAIL: Expected 401, got ${badLoginRes.status}`);
        }

        section("TEST 3 - POST /api/auth/login with missing field returns 401");

        const missingFieldsRes = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: REAL_EMAIL}),
        });

        if(missingFieldsRes.status === 400){
            const body = await missingFieldsRes.json() as any;
            console.log(`\n PASS: Missing fields returned 400`);
            console.log(`   Message: "${body.message}"`);
        }else{
            console.log(`\n FAIL: Expected 400, got ${missingFieldsRes.status}`);
        }

        
    } catch(err){

    }
}

runTests().catch(console.error);