import type ts = require("typescript");

export type AssignmentType = | "homework"
  | "quiz"
  | "exam"
  | "project"
  | "reading"
  | "discussion"
  | "lab";

  export type AssignmentStatus = | "upcoming" | "in_progress" | "submitted" | "graded";

  export interface Assignment {
    id: string;                     //UUID
    courseId: string;               //Links back to a Course
    title: string;                  // ex: "Chapter 5 quiz"
    description: string;            //Full assignment details
    type: AssignmentType;           //controls how the AI schedules and weights it
    dueDate: string;                //ISO 8601: "2026-09-15T23:59:00"
    availableDate?: string;         //ISO 8601: when it unlocks - optional
    estimatedMinutes: number;       //AI's estimate of how long this takes
    weight?: number;                // % of course grade - optional
    status: AssignmentStatus;       // where the assignment is in its lifecycle
    grade?: number;                 // populated after grading - optional
    priority: number;               // calculated by scheduling engine
  }