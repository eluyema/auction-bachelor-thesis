export interface MyParticipationDto {
    isParticipant: boolean;
    pseudonym?: string;
    coefficient?: number | null;
    lastYears?: number | null;
    lastDays?: number | null;
    lastPercent?: number | null;
}
