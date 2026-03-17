export interface WeeklyTopic {
    weekNumber: number;
    topic: string;
    readings?: string;
    notes?: string;
}

export interface Syllabus{
    id: string;
    courseId: string;
    weeklyTopics: WeeklyTopic[];
}