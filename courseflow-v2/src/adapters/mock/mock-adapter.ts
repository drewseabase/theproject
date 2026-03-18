import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import type { LMSAdapter } from "../lms-adapter.interface.js";
import type { User } from "../../models/user.model.js";
import type { Course } from "../../models/course.model.js";
import type { Assignment } from "../../models/assignment.model.js";
import type { Syllabus } from "../../models/syllabus.model.js";
import { mockUsers } from "./seed-data/users.js";
import { mockCourses } from "./seed-data/courses.js";
import { mockAssignments } from "./seed-data/assignments.js";
import { mockSyllabi } from "./seed-data/syllabi.js";

export class MockAdapter implements LMSAdapter{

    async authenticate(email: string, password: string): Promise<{ token: string; user: User; }> {
        const user = mockUsers.find(
            (u) => u.email.toLowerCase() == email.toLowerCase()
        );

        if(!user){
            throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if(!isValid){
            throw new Error("Invalid email or password");
        }

        const payload = {
            userId: user.id,
            email: user.email,
        };

        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error("JWT_SECRET is not defined in environment variables")
        }

        const token = jwt.sign(payload, secret, {expiresIn: "7d"});

        const {passwordHash: _removed, ...safeUser} = user;

        return{
            token,
            user: safeUser as User,
        };
    }

    async getCourses(userId: string): Promise<Course[]> {
        const user = mockUsers.find((u) => u.id === userId);

        if(!user){
            throw new Error(`User not found: ${userId}`);
        }

        const enrolledCourses = mockCourses.filter((course)=> user.enrolledCourseIds.includes(course.id));

        return enrolledCourses;
    }

    async getAssignments(courseId: string): Promise<Assignment[]>{
        const assignments = mockAssignments.filter((a) => a.courseId === courseId).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        return assignments;
    }

    async getAllUpcomingAssignments(userId: string, startDate: string, endDate: string): Promise<Assignment[]> {
        const user = mockUsers.find((u) => u.id === userId);

        if(!user){
            throw new Error(`User not found: ${userId}`);
        }

        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const doneStatuses = ["submitted", "graded"];

        const upcoming = mockAssignments.filter((a) => {
            const due = new Date(a.dueDate).getTime();

            const isEnrolled = user.enrolledCourseIds.includes(a.courseId);
            const isInRange = due >= start && due <= end;
            const isNotDone = !doneStatuses.includes(a.status);

            return isEnrolled && isInRange && isNotDone;
        }).sort(
            (a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

        return upcoming;
    }

    async getSyllabus(courseId: string): Promise<Syllabus | null> {
        const syllabus = mockSyllabi.find((s) => s.courseId === courseId);

        return syllabus ?? null;
    }

}