import type { Course } from "../../../models/course.model.js";

// These course IDs must exactly match the enrolledCourseIds in users.ts.
// That string match is how the app knows which courses belong to which student
// without needing a real database with foreign key relationships.

export const mockCourses: Course[] = [
  {
    id: "course-001",
    name: "Cell Biology",
    code: "BIO 201",
    section: "Section 002",
    semester: "Fall 2026",
    instructorName: "Dr. Patricia Nguyen",
    color: "#2E7D32",                          // green — used on every BIO event on the calendar
    meetingTimes: [
      {
        day: "monday",
        startTime: "09:00",
        endTime: "09:50",
        location: "Room 214 Science Hall",
      },
      {
        day: "wednesday",
        startTime: "09:00",
        endTime: "09:50",
        location: "Room 214 Science Hall",
      },
      {
        day: "friday",
        startTime: "09:00",
        endTime: "09:50",
        location: "Room 214 Science Hall",
      },
    ],
  },

  {
    id: "course-002",
    name: "Data Structures & Algorithms",
    code: "CS 310",
    section: "Section 001",
    semester: "Fall 2026",
    instructorName: "Prof. Marcus Webb",
    color: "#1565C0",                          // blue
    meetingTimes: [
      {
        day: "tuesday",
        startTime: "11:00",
        endTime: "12:15",
        location: "Room 103 Tech Building",
      },
      {
        day: "thursday",
        startTime: "11:00",
        endTime: "12:15",
        location: "Room 103 Tech Building",
      },
    ],
  },

  {
    id: "course-003",
    name: "American Literature",
    code: "ENG 215",
    section: "Section 004",
    semester: "Fall 2026",
    instructorName: "Dr. Sandra Okafor",
    color: "#6A1B9A",                          // purple
    meetingTimes: [
      {
        day: "monday",
        startTime: "13:00",
        endTime: "13:50",
        location: "Room 308 Humanities Building",
      },
      {
        day: "wednesday",
        startTime: "13:00",
        endTime: "13:50",
        location: "Room 308 Humanities Building",
      },
      {
        day: "friday",
        startTime: "13:00",
        endTime: "13:50",
        location: "Room 308 Humanities Building",
      },
    ],
  },

  {
    id: "course-004",
    name: "Linear Algebra",
    code: "MATH 240",
    section: "Section 003",
    semester: "Fall 2026",
    instructorName: "Dr. James Calloway",
    color: "#E65100",                          // orange
    meetingTimes: [
      {
        day: "tuesday",
        startTime: "14:00",
        endTime: "15:15",
        location: "Room 201 Math Building",
      },
      {
        day: "thursday",
        startTime: "14:00",
        endTime: "15:15",
        location: "Room 201 Math Building",
      },
    ],
  },

  {
    id: "course-005",
    name: "Modern World History",
    code: "HIST 150",
    section: "Section 001",
    semester: "Fall 2026",
    instructorName: "Prof. Elena Vasquez",
    color: "#C62828",                          // red
    meetingTimes: [
      {
        day: "monday",
        startTime: "15:00",
        endTime: "15:50",
        location: "Room 412 Liberal Arts Building",
      },
      {
        day: "wednesday",
        startTime: "15:00",
        endTime: "15:50",
        location: "Room 412 Liberal Arts Building",
      },
      {
        day: "friday",
        startTime: "15:00",
        endTime: "15:50",
        location: "Room 412 Liberal Arts Building",
      },
    ],
  },
];