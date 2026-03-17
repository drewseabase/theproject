import type {User} from "../../../models/user.model.js";

export const mockUsers: User[] = [
    {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        email: "dseabase@gmail.com",
        displayName: "Drew Seabase",
        passwordHash: "$2b$10$9QkRHS83HSLGMcz0Ukhqs.Oc7j4t0LrJ27cC1BuxgheU6vZAa0NEq",
        enrolledCourseIds: [
            "course-001",
            "course-002",
            "course-003",
            "course-004",
            "course-005",
        ],
        createdAt: new Date("2026-08-15T10:00:00Z"),
    },
];