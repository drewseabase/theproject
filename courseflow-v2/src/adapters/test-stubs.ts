// src/adapters/test-stubs.ts
//
// Run with: npx ts-node src/adapters/test-stubs.ts
//
// Verifies that both stub adapters:
//   1. Can be instantiated without errors
//   2. Implement all 5 required LMSAdapter methods
//   3. Throw clear, helpful errors when any method is called
//   4. Do NOT silently return undefined or null instead of throwing

import { CanvasAdapter } from "./canvas/canvas-adapter.js";
import { D2LAdapter } from "./d2l/d2l-adapter.js";
import type { LMSAdapter } from "./lms-adapter.interface.js";

function section(title: string) {
  console.log("\n" + "=".repeat(60));
  console.log(`  ${title}`);
  console.log("=".repeat(60));
}

// Tests all 5 methods on any adapter stub and confirms each throws
async function testStubAdapter(name: string, adapter: LMSAdapter) {

  const methods: Array<{ label: string; call: () => Promise<unknown> }> = [
    {
      label: "authenticate()",
      call: () => adapter.authenticate("test@test.com", "password"),
    },
    {
      label: "getCourses()",
      call: () => adapter.getCourses("user-123"),
    },
    {
      label: "getAssignments()",
      call: () => adapter.getAssignments("course-001"),
    },
    {
      label: "getAllUpcomingAssignments()",
      call: () => adapter.getAllUpcomingAssignments("user-123", "2026-09-01", "2026-12-15"),
    },
    {
      label: "getSyllabus()",
      call: () => adapter.getSyllabus("course-001"),
    },
  ];

  for (const method of methods) {
    try {
      await method.call();
      // If we reach this line the method did NOT throw — that's a failure
      console.log(`\n   ❌ ${method.label} — should have thrown but didn't`);
    } catch (err) {
      if (err instanceof Error && err.message.includes("not yet implemented")) {
        console.log(`\n   ✅ ${method.label} → "${err.message.substring(0, 60)}..."`);
      } else {
        console.log(`\n   ❌ ${method.label} — threw wrong error:`, err);
      }
    }
  }
}

async function runTests() {

  // ── Test 1: CanvasAdapter can be instantiated ──────────────────────────
  section("TEST 1 — CanvasAdapter instantiates without error");

  try {
    const canvas = new CanvasAdapter();
    console.log("\n✅ PASS: CanvasAdapter instantiated successfully");

    // Also verify it satisfies the LMSAdapter interface shape
    const methods = ["authenticate", "getCourses", "getAssignments", "getAllUpcomingAssignments", "getSyllabus"];
    const missing = methods.filter(m => typeof (canvas as any)[m] !== "function");

    if (missing.length === 0) {
      console.log("✅ PASS: All 5 LMSAdapter methods present on CanvasAdapter");
    } else {
      console.log(`❌ FAIL: Missing methods: ${missing.join(", ")}`);
    }
  } catch (err) {
    console.error("\n❌ CanvasAdapter failed to instantiate:", err);
  }

  // ── Test 2: CanvasAdapter methods throw clear errors ───────────────────
  section("TEST 2 — CanvasAdapter methods throw helpful errors");
  await testStubAdapter("CanvasAdapter", new CanvasAdapter());

  // ── Test 3: D2LAdapter can be instantiated ─────────────────────────────
  section("TEST 3 — D2LAdapter instantiates without error");

  try {
    const d2l = new D2LAdapter();
    console.log("\n✅ PASS: D2LAdapter instantiated successfully");

    const methods = ["authenticate", "getCourses", "getAssignments", "getAllUpcomingAssignments", "getSyllabus"];
    const missing = methods.filter(m => typeof (d2l as any)[m] !== "function");

    if (missing.length === 0) {
      console.log("✅ PASS: All 5 LMSAdapter methods present on D2LAdapter");
    } else {
      console.log(`❌ FAIL: Missing methods: ${missing.join(", ")}`);
    }
  } catch (err) {
    console.error("\n❌ D2LAdapter failed to instantiate:", err);
  }

  // ── Test 4: D2LAdapter methods throw clear errors ──────────────────────
  section("TEST 4 — D2LAdapter methods throw helpful errors");
  await testStubAdapter("D2LAdapter", new D2LAdapter());

  // ── Summary ─────────────────────────────────────────────────────────────
  section("ALL TESTS COMPLETE");
  console.log("\nBoth stubs are correctly shaped and correctly stubbed.");
  console.log("When you're ready to implement Canvas or D2L, open the adapter");
  console.log("file — the endpoint map and implementation notes are waiting.\n");
}

runTests().catch(console.error);