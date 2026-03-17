export type RecurrenceType = "none" | "daily" | "weekly" | "biweekly" | "monthly";

export type EventCategory = "class" | "work" | "personal" | "blocked";

export interface FixedEvent {
  id: string;                        // UUID
  userId: string;                    // which user this belongs to
  title: string;                     // "Work Shift" / "Gym"
  description?: string;              // optional extra detail
  startTime: string;                 // ISO 8601: "2026-09-15T09:00:00Z"
  endTime: string;                   // ISO 8601: "2026-09-15T17:00:00Z"
  recurrence: RecurrenceType;        // does this repeat?
  recurrenceDays: string[];          // ["monday", "wednesday"] for weekly events
  color: string;                     // "#E24A4A" hex color on the calendar
  category: EventCategory;           // controls how the scheduler treats this block
}