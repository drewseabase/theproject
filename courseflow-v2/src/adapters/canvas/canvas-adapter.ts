// ============================================================
// Canvas Adapter
// ============================================================
//
// Canvas LMS uses the REST API documented at:
// https://canvas.instructure.com/doc/api/
//
// BASE URL pattern: https://{institution}.instructure.com/api/v1
// Example: https://umich.instructure.com/api/v1
//
// The institution URL is school-specific and must be stored
// on the user's account at setup time (the "select your school"
// screen). It gets passed into this adapter's constructor.
//
// AUTHENTICATION:
//   Canvas uses OAuth 2.0. The flow is:
//   1. Redirect user to: https://{institution}.instructure.com/login/oauth2/auth
//      with client_id, redirect_uri, and response_type=code
//   2. Canvas redirects back with an authorization code
//   3. Exchange code for an access token via POST to:
//      https://{institution}.instructure.com/login/oauth2/token
//   4. Store the access token — include it as a Bearer token on all future requests:
//      Authorization: Bearer {access_token}
//
// PAGINATION:
//   Canvas paginates all list endpoints. Responses include a Link header:
//   Link: <https://...?page=2>; rel="next"
//   You must follow "next" links until there is no next page.
//   All list methods in the real implementation will need a pagination helper.
//
// RATE LIMITING:
//   Canvas rate limits at ~3000 requests per hour per token.
//   Watch for 403 responses with X-Rate-Limit-Remaining header.
//
// ENDPOINT MAP:
//   authenticate         → OAuth 2.0 flow (see above)
//   getCourses           → GET /api/v1/courses?enrollment_state=active
//   getAssignments       → GET /api/v1/courses/:courseId/assignments
//   getAllUpcomingAssign  → GET /api/v1/users/self/upcoming_events
//                          OR loop getCourses → getAssignments and merge
//                          (upcoming_events is simpler but less detailed)
//   getSyllabus          → Canvas has no native syllabus structure endpoint.
//                          Options:
//                          a) GET /api/v1/courses/:id/pages for wiki pages
//                          b) Parse the course syllabus_body HTML field
//                          c) Use AI to extract structure from syllabus PDF
//                          This will likely require custom mapping logic.
// ============================================================
import type { LMSAdapter } from "../lms-adapter.interface.js";
import type { User } from "../../models/user.model.js";
import type { Course } from "../../models/course.model.js";
import type { Assignment } from "../../models/assignment.model.js";
import type { Syllabus } from "../../models/syllabus.model.js";


export class CanvasAdapter implements LMSAdapter{

    private baseUrl: string;

    constructor(institutionUrl: string = ""){
        this.baseUrl = institutionUrl;
    }

    async authenticate(email: string, password: string): Promise<{ token: string; user: User; }> {
        throw new Error(
            "CanvasAdapter.authenticate() is not yet implemented. " +
            "Canvas uses 0Auth 2.0 - see file header for full flow"
        )
    }

    async getCourses(userId: string): Promise<Course[]>{
        throw new Error(
            "CanvasAdapter.getCourses() is not yet implemented. " + 
            "Target endpoint: GET /api/v1/courses?enrollment_state=active"
        );
    }

    async getAssignments(courseId: string): Promise<Assignment[]> {
        throw new Error(
            "CanvasAdapter.getAssignments() is not yet implemented. " +
            `Target endpoint: GET /api/v1/courses/${courseId}/assignments` 
        );
    }

    async getAllUpcomingAssignments(userId: string, startDate: string, endDate: string): Promise<Assignment[]> {
        throw new Error(
            "CanvasAdapter.getAllUpcomingAssignments() is not yet implemented. " +
            "Recommended Approach: loop getCourses -> getAssignments -> filter by date range."
        );
    }

    async getSyllabus(courseId: string): Promise<Syllabus | null> {
        throw new Error(
            "CanvasAdapter.getSyllabus() is not yet implemented. " + 
            "Canvas has no native Syllabus structure - see file header for options."
        );
    }
}