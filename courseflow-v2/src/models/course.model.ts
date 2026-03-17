export interface MeetingTime {
    day:  "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
    startTime: string;
    endTime: string;
    location: string;
}

export interface Course{
    id: string;
    name: string;
    code: string;
    section?: string;
    semester: string;
    instructorName: string;
    color: string;
    meetingTimes: MeetingTime[];
}