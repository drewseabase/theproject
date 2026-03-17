import type {User} from "../models/user.model.js"
import type {Course} from "../models/course.model.js";
import type {Assignment} from "../models/assignment.model.js";
import type {Syllabus} from "../models/syllabus.model.js";

//This is the contract that every LMS adapter must fulfill
//Canvas, D2L, Blackboard, or Mock - They all implement this exact interface
//The rest of the app only ever talks to this interface, never to the LMS directly.

export interface LMSAdapter{
    //Verifies credentials with the LMS and returns a session token + the user's data
    //Called when a student logs into CourseFlow
    authenticate(
        email: string,
        password: string
    ): Promise<{token: string; user: User}>;

    //Fetches all courses a student is enrolled in
    //Returns universal Course shape, regardless of which LMS provided the data
    getCourses(userId: string): Promise<Course[]>;

    //Fetches all assignments for a single course
    //The AI engine calls this per-course to build the study schedule
    getAssignments(courseId: string): Promise<Assignment[]>;

    //Fetches all upcoming assignments across every course in a data range.
    //This is the main feed for the calendar view
    getAllUpcomingAssignments(
        userId: string,
        startDate: string,
        endDate: string,
    ): Promise<Assignment[]>;

    //Fetches the week-by-week syllabus for a course
    //Returns null if the LMS doesn't provide one - that's valid and expected
    getSyllabus(courseId: string): Promise<Syllabus | null>;
}