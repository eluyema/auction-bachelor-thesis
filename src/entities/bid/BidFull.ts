import { User } from '../users/MyUser';

export interface BidFull {
    id: string;
    roundId: string;
    sequenceNumber: number;
    total: number;
    bidOptions: null;
    userId: string | null;
    totalUpdatedAt: string;
    startAt: string;
    endAt: string;
    User: User | null;
}
