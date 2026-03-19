import dotenv from "dotenv";
dotenv.config();

import { MockAdapter } from "./mock-adapter.js";
const adapter = new MockAdapter();

function section(title: string){
    console.log("\n" + "=".repeat(60));
    console.log(` ${title}`);
    console.log("=".repeat(60));
}

function log(label: string, value: unknown){
    console.log(`\n[${label}]`);
    console.log(JSON.stringify(value, null, 2));
}

async function runTests(){
    const TEST_EMAIL = "dseabase@gmail.com";
    const TEST_PASSWORD = "BlossomRain24!";

    let userId = "";
    let token = "";

    section("TEST 1 - authenticate()");

    try{
        const result = await adapter.authenticate(TEST_EMAIL, TEST_PASSWORD);
        token = result.token;
        userId = result.user.id;

        log("token (first 40 chars)", result.token.substring(0,40) + "...");
        log("user returned", result.user);

        if("passwordHash" in result.user){
            console.log("\n FAIL: passwordHash should not be returned to caller");
        }else{
            console.log("\n PASS: passwordHash correctly stripped from response");
        }
    } catch(err){
        console.error("\n authenticate() FAILED:", err);
        console.error("Check that your email and password match what is in users.ts");
        console.error("Check that your bcrypt hash was generated correctly");
        return;
    }

    section("TEST 2 - authenticate() with wrong password");

    try{
        await adapter.authenticate(TEST_EMAIL,"wrongpassword");
        console.log("\n FAIL: Should have thrown an error for wrong password");
    }catch(err){
        if(err instanceof Error){
            console.log(`\n PASS: Correctly threw error "${err.message}"`);
        }
    }

    section("TEST 3 - getCourses()");

    try{
        const courses = await adapter.getCourses(userId);
        log(`courses returned (${courses.length} total)`, courses.map(c => ({
            id: c.id,
            code: c.code,
            name: c.name,
            meetingDays: c.meetingTimes.map(m => m.day),
        })));

        if(courses.length === 5){
            console.log("\n PASS: Returned 5 courses");
        }else{
            console.log(`\n FAIL: Expected 5 courses, got ${courses.length}`);
        }
    }catch(err){
        console.error("\n getCourses() FAILED:", err);
    }

    section("TEST 4 - getAssignments() for BIO 201(course-001)");

    try {
        const assignments = await adapter.getAssignments("course-005");
        log(`assignments returned (${assignments.length} total)`, assignments.map(a =>({
            id: a.id,
            title: a.title,
            dueDate: a.dueDate,
            estimatedMinutes: a.estimatedMinutes,
            weight: a.weight,
        })));

        let isSorted = true;
        for(let i = 1; i < assignments.length; i++){
            const current = assignments[i];
            const previous = assignments[i - 1];
            if(!current || !previous) continue;

            if(new Date(current.dueDate) < new Date(previous.dueDate)){
                isSorted = false;
                break;
            }
        }

        if (isSorted){
            console.log("\n PASS: Assignments are sorted by dueDate ascending");
        } else {
            console.log("\n FAIL: Assignments are NOT sorted correctly");
        }
    } catch (err){
        console.error("\n getAssignments() FAILED: ", err);
    }

    section("TEST 5 - getAllUpcomingAssignments() for full semester");

    try{
        const upcoming = await adapter.getAllUpcomingAssignments(
            userId,
            "2026-08-25",
            "2026-12-15"
        );

        log(`upcoming assignments (${upcoming.length} total - first 5 shown)`, upcoming.slice(0,5).map(a =>({
            id: a.id,
            title: a.title,
            courseId: a.courseId,
            dueDate: a.dueDate,
            status: a.status,
        })));

        if(upcoming.length > 50){
            console.log(`\n PASS:  ${upcoming.length} upcoming assignments found across all courses`);
        } else{ 
            console.log(`\n WARNING: Only ${upcoming.length} assignments found - expected 60+`);
        }
    } catch (err){
        console.log("\n getAllUpcomingAssignments() FAILED: ", err);
    }

    section("TEST 6 - getAllUpcomingAssignments() scoped to Hell Week 1");

    try {
        const hellWeek = await adapter.getAllUpcomingAssignments(
            userId,
            "2026-10-05",
            "2026-10-07"
        );

        log(`hell week 1 assignments (Oct 5-7)`, hellWeek.map(a => ({
            title: a.title,
            courseId: a.courseId,
            dueDate: a.dueDate,
            estimatedMinutes: a.estimatedMinutes,
        })));

        const totalMinutes = hellWeek.reduce((sum, a) => sum + a.estimatedMinutes, 0);

        console.log(`\n Total estimated prep time for hell week: ${totalMinutes} minutes (${(totalMinutes / 60).toFixed(1)} hours)`);

        if(hellWeek.length >= 3){
            console.log(`\n PASS: ${hellWeek.length} assignments cluster in hell week 1 - AI has a real problem to solve`);
        } else {
            console.log(`\n WARNING: Only ${hellWeek.length} assignments in hell week - check due dates in assignments.ts`);
        }
    } catch (err){
        console.error("\n Hell week filter Failed: ", err);
    }

    section("TEST 7 - getSyllabus() for CS 310");

    try{
        const syllabus = await adapter.getSyllabus("course-002");

        if(syllabus){
            log("syllabus (first 3 weeks shown)", {
                id: syllabus.id,
                courseId: syllabus.courseId,
                totalWeeks: syllabus.weeklyTopics.length,
                firstThreeWeeks: syllabus.weeklyTopics.slice(0,3),
            });

            if(syllabus.weeklyTopics.length === 15){
                console.log("\n PASS: Syllabus has 15 weekly topics");
            }else{
                console.log(`\n FAIL: Expected 15 weeks, got ${syllabus.weeklyTopics.length}`);
            }
        }else{
            console.log("\n FAIL: getSyllabus() returned null for a course that should have one")
        }
    } catch (err){
        console.error("\n getSyllabus() FAILED:", err);
    }

    section("TEST 8 - getSyllabus() for a course that doesn't exist");

    try{
        const missing = await adapter.getSyllabus("course-999");

        if(missing === null){
            console.log("\n PASS: Correctly returned null for unknown courseId");
        } else{
            console.log("\n FAIL: Should have returned null");
        }
    } catch (err){
        console.error("\n getSyllabus() threw instead of returning null", err);
    }

    section("ALL TESTS COMPLETE");
}


runTests().catch(console.error);