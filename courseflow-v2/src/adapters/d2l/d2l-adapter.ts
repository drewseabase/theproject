// ============================================================
// D2L Brightspace Adapter
// ============================================================
//
// D2L uses the Valence API documented at:
// https://docs.valence.desire2learn.com/
//
// BASE URL pattern: https://{institution}.brightspace.com
// Example: https://coloradostate.brightspace.com
//
// The institution URL is school-specific and must be stored
// on the user's account at setup time (the "select your school"
// screen). It gets passed into this adapter's constructor.
//
// AUTHENTICATION:
//   D2L uses a two-step app authentication system called Valence Auth:
//   1. Register your app with D2L to receive an App ID and App Key
//   2. User logs in via D2L's login page with their school credentials
//   3. D2L redirects back with a User ID and User Key
//   4. Every API request must include a URL-signed timestamp using
//      both the App Key and User Key — this is D2L's custom signature
//      scheme, different from standard OAuth.
//
//   Alternatively, D2L supports OAuth 2.0 on newer instances.
//   Check the institution's Brightspace version before implementing.
//
// VERSIONING:
//   D2L Valence is versioned per API product:
//   - LP (Learning Platform): /d2l/api/lp/{version}/
//   - LE (Learning Environment): /d2l/api/le/{version}/
//   Version numbers differ per endpoint group — always check docs.
//   Current stable: LP 1.28, LE 1.53 (verify against target institution)
//
// RATE LIMITING:
//   D2L rate limits vary by institution configuration.
//   Implement exponential backoff on 429 responses.
//
// ENDPOINT MAP:
//   authenticate         → Valence Auth (App ID + App Key + User credentials)
//                          OR OAuth 2.0 if supported by institution
//   getCourses           → GET /d2l/api/lp/{ver}/enrollments/myenrollments/
//                          Filter by orgUnitType to get only courses (not orgs/depts)
//   getAssignments       → GET /d2l/api/le/{ver}/{orgUnitId}/dropbox/folders/
//                          (Dropbox = D2L's term for assignment submission folders)
//                          Also check: GET /d2l/api/le/{ver}/{orgUnitId}/content/topics/
//                          for non-submission content items with due dates
//   getAllUpcomingAssign  → No single unified endpoint in D2L.
//                          Must loop all enrolled orgUnitIds and call
//                          getAssignments() for each, then filter by date.
//   getSyllabus          → GET /d2l/api/le/{ver}/{orgUnitId}/content/root/
//                          Returns the course content tree. Syllabus is typically
//                          a module in the content tree — requires traversal
//                          and heuristic matching to identify the syllabus document.
// ============================================================
 import type { LMSAdapter } from "../lms-adapter.interface.js";
 import type { User } from "../../models/user.model.js";
 import type { Course } from "../../models/course.model.js";
 import type { Assignment } from "../../models/assignment.model.js";
 import type { Syllabus } from "../../models/syllabus.model.js";

 export class D2LAdapter implements LMSAdapter{

    private baseUrl: string;

    constructor(institutionUrl: string = ""){
        this.baseUrl = institutionUrl;
    }

    async authenticate(email: string, password: string): Promise<{ token: string; user: User; }> {
        throw new Error(
            "D2LAdapter.authenticate() is not yet implemented. " +
            "D2L uses Valence Auth with App ID + App Key — see file header. " +
            "Set LMS_PROVIDER=mock in your .env to use the mock adapter."
        );   
    }

    async getCourses(userId: string): Promise<Course[]> {
        throw new Error(
            "D2LAdapter.getCourses() is not yet implemented. " +
            "Target endpoint: GET /d2l/api/lp/{version}/enrollment/myenrollments/"
        );
    }

    async getAssignments(courseId: string): Promise<Assignment[]> {
        throw new Error(
            "D2LAdapter.getAssignments() is not yet implemented. " + 
            `Target endpoints: dropbox/folders/and content/topics/ for orgUnit ${courseId}`
        );
    }

    async getAllUpcomingAssignments(userId: string, startDate: string, endDate: string): Promise<Assignment[]> {
        throw new Error(
            "D2L.getAllUpcomingAssignments() is not yet implemented. " +
            "D2L requires looping all enrolled courses - see file header for strategy."
        );
    }

    async getSyllabus(courseId: string): Promise<Syllabus | null> {
        throw new Error(
            "D2LAdapter.getSyllabus() is not yet implemented. " +
            "D2L stores syllabi in the content tree - see file header for traversal strategy."
        );
    }
 }