import dotenv from "dotenv";
dotenv.config();

import { getAdapter } from "./adapter-registry.js";
import { MockAdapter } from "../adapters/mock/mock-adapter.js";

function section(title: string) {
  console.log("\n" + "=".repeat(60));
  console.log(`  ${title}`);
  console.log("=".repeat(60));
}
 
async function runTests(){

    section('TEST 1 - LMS_PROVIDER="mock" returns MockAdapter');

    try {
        process.env.LMS_PROVIDER = "mock";
        const adapter = getAdapter();

        if(adapter instanceof MockAdapter){
            console.log("\n PASS: getAdapter() returned a mockAdapter instance");
        }else{
            console.log("\n FAIL: Wrong adapter type returned");
        }
    }catch (err){
        console.error("\n getAdapter() threw unexepctedly:", err);
    }

    section("TEST 2 - Returned adapter has all 5 LSMAdapter methods");

    try{
        process.env.LMS_PROVIDER = "mock";
        const adapter = getAdapter();

        const requiredMethods = [
            "authenticate",
            "getCourses",
            "getAssignments",
            "getAllUpcomingAssignments",
            "getSyllabus",
        ];

        let allPresent = true;
        for(const method of requiredMethods){
            if(typeof(adapter as any)[method] === "function"){
                console.log(`\n ${method}() - present`);
            }else{
                console.log(`\n ${method}() - MISSING`);
                allPresent = false;
            }
        }

        if(allPresent){
            console.log("\n PASS: All 5 interface methods are present");
        }else{
            console.log("\n FAIL: One or more methods missing from adapter");
        }
    }catch (err){
        console.error("\n Threw unexpectedly: ", err);
    }

    section('TEST 3 - LMS_PROVIDER="canvas" throws a helpful error');

    try{
        process.env.LMS_PROVIDER = "canvas";
        getAdapter();
        console.log("\n FAIL: Should have thrown for canvas");
    }catch (err){
        if(err instanceof Error && err.message.includes("not yet implemented")){
            console.log(`\n PASS: Threw correct error ${err.message}`);
        }else{
            console.log("FAIL: Threw wrong error:", err);
        }
    }

    section('TEST 4 - LMS_PROVIDER="d2l" throws a helpful error');

    try{
        process.env.LMS_PROVIDER = "d2l";
        getAdapter();
        console.log("\n FAIL: Should have thrown for d2l");
    } catch (err){
        if(err instanceof Error && err.message.includes("not yet implemented")){
            console.log(`\n PASS: Threw correct error ${err.message}`);
        }else{
            console.log("\n FAIL: Threw wrong error:", err);
        }
    }

    section('TEST 5 - Unknown LMS_PROVIDER throws a clean error');

    try {
        process.env.LMS_PROVIDER = "blackboard";
        getAdapter();
        console.log("\n❌ FAIL: Should have thrown for unknown provider");
    } catch (err) {
        if (err instanceof Error && err.message.includes("Unknown LMS provider")) {
            console.log(`\n✅ PASS: Threw correct error → "${err.message}"`);
        } else {
            console.log("\n❌ FAIL: Threw wrong error:", err);
        }
    }

    section("TEST 6 - Missing LMS_PROVIDER throws a clean error");

    try{
        delete process.env.LMS_PROVIDER;
        getAdapter();
        console.log("\n FAIL: Should have thrown for missing provider");
    }catch (err){
        if (err instanceof Error && err.message.includes("LMS_PROVIDER not set")){
            console.log(`\n PASS: Threw correct error ${err.message}`);
        }else{
            console.log("\n FAIL: Threw wrong error:", err);
        }
    }

    process.env.LMS_PROVIDER = "mock";
    console.log("\n\n (LMS_PROVIDER restored to 'mock')");
}

runTests().catch(console.error);
