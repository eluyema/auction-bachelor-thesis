import { User } from '../users/MyUser';

export interface BidFull {
    id: string;
    roundId: string;
    sequenceNumber: number;
    total: number | null;
    userId: string | null;
    totalUpdatedAt: string;
    startAt: string;
    endAt: string;
    User: User | null;
    pseudonym: string;
    years: number | null;
    days: number | null;
    percent: number | null;
    adjustedPrice: number | null;
    coefficient: number | null;
}
