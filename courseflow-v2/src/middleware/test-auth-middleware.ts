import dotenv from "dotenv";
dotenv.config();

import type { Request, Response, NextFunction } from "express";
import { requireAuth } from "./auth.middleware.js";
import { generateToken } from "../adapters/mock/mock-auth.js";
import type { User } from "../models/user.model.js";

function section(title: string){
    console.log("\n" + "=".repeat(60));
    console.log(`   ${title}`);
    console.log("=".repeat(60));
}

function mockRequest(authHeader?: string): Partial<Request>{
    return{
        headers: {
            authorization: authHeader,
        },
    };
}

function mockResponse(): Partial<Response> & {
    statusCode: number;
    body: unknown;
}{
    const res: any = {statusCode: 200, body: null};

    res.status = (code: number) => {
        res.statusCode = code;
        return res;
    };
    res.json = (body: unknown) => {
        res.body = body;
        return res;
    };

    return res;
}

function mockNext(): {fn: NextFunction; wasCalled: boolean}{
    const tracker = {fn: null as any, wasCalled: false};
    tracker.fn = () => {tracker.wasCalled = true};
    return tracker;
}

const fakeUser: User = {
    id: "test-user-id-123",
    email: "test@courseflow.dev",
    displayName: "Test User",
    passwordHash: "irrelevant",
    enrolledCourseIds: [],
    createdAt: new Date(),
};

async function runTests(){

    section("TEST 1 - Valid token: next() is called and req.user is set");

    const validToken = generateToken(fakeUser);
    const req1 = mockRequest(`Bearer ${validToken}`);
    const res1 = mockResponse();
    const next1 = mockNext();

    requireAuth(req1 as Request, res1 as Response, next1.fn);

    if(next1.wasCalled){
        console.log("\n PASS: next() was called - request passed through");
    }else {
        console.log("\n FAIL: next() was NOT called");
    }

    if((req1 as any).user?.email == fakeUser.email){
        console.log(`PASS: req.user.email = "${(req1 as any).user.email}"`);
    }else{
        console.log("FAIL: req.user.email was not set correctly");
    }

    section("TEST 2 - No Authorization header returns 401");

    const req2 = mockRequest(undefined);
    const res2 = mockResponse();
    const next2 = mockNext();

    requireAuth(req2 as Request, res2 as Response, next2.fn);

    if(!next2.wasCalled && res2.statusCode === 401){
        console.log(`\n PASS: Returned 401, next() not called`);
        console.log(`   Response body: ${JSON.stringify(res2.body)}`);
    }else{
        console.log(`\n FAIL: status=${res2.statusCode}, next called=${next2.wasCalled}`);
    }

      // ── Test 3: Malformed header (no "Bearer ") → 401 ──────────────────────
    section('TEST 3 — Malformed header (missing "Bearer ") returns 401');
 
    const req3 = mockRequest(validToken); // token without "Bearer " prefix
    const res3 = mockResponse();
    const next3 = mockNext();
 
    requireAuth(req3 as Request, res3 as Response, next3.fn);
 
    if (!next3.wasCalled && res3.statusCode === 401) {
        console.log(`\n✅ PASS: Returned 401 for malformed header`);
    } else {
        console.log(`\n❌ FAIL: status=${res3.statusCode}, next called=${next3.wasCalled}`);
    }

    section("TEST 4 - Tampered token returns 401");

    const tamperedToken = validToken.slice(0, -5) + "XXXXX";
    const req4 = mockRequest(`Bearer ${tamperedToken}`);
    const res4 = mockResponse();
    const next4 = mockNext();

    requireAuth(req4 as Request, res4 as Response, next4.fn);

    if(!next4.wasCalled && res4.statusCode === 401){
        console.log(`\n PASS: Tampered token returned 401`);
        console.log(`   Response body: ${JSON.stringify(res4.body)}`);
    }else{
        console.log(`\n FAIL: status=${res4.statusCode}, next called=${next4.wasCalled}`);
    }

    section("TEST 5 - Completely fake token returns 401");

    const req5 = mockRequest("Bearer this.is.fake");
    const res5 = mockResponse();
    const next5 = mockNext();

    requireAuth(req5 as Request, res5 as Response, next5.fn);

    if(!next5.wasCalled && res5.statusCode === 401){
        console.log(`\n PASS: Fake token returned 401`);
    }else{
        console.log(`\n FAIL: status=${res5.statusCode}, next called=${next5.wasCalled}`);
    }

    section('TEST 6 - "Bearer" with no token returns 401');

    const req6 = mockRequest("Bearer ");
    const res6 = mockResponse();
    const next6 = mockNext();

    requireAuth(req6 as Request, res6 as Response, next6.fn);

    if(!next6.wasCalled && res6.statusCode === 401){
        console.log(`\n PASS: Empty token returned 401`);
    }else{
        console.log(`\n FAIL: status=${res6.statusCode}, next called=${next6.wasCalled}`);
    }
}

runTests().catch(console.error);