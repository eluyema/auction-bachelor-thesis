import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { AuctionInfoDto } from './dto/auctionInfoDto';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionFullDto } from './dto/auctionFullDto';
import { MyParticipationDto } from './dto/myParticipationDto';
import { MakeBidDto } from './dto/makeBidDto';

export class AuctionClient extends HttpClient {
    async getAllAuctions() {
        const rawAuctions = await this.get<AuctionInfoDto[]>('/');

        const auctions: AuctionInfo[] = rawAuctions.map((data) => ({ ...data }));

        return auctions;
    }

    async getUserAuctions(userId: string) {
        const rawData = await this.get<{ userName: string; auctions: AuctionInfoDto[] }>(
            '/participants/' + userId,
        );

        const auctions: AuctionInfo[] = rawData.auctions.map((data) => ({ ...data }));

        return { userName: rawData.userName, auctions };
    }

    async getAuctionById(auctionId: string): Promise<AuctionFull> {
        const rawAuction = await this.get<AuctionFullDto>('/public/' + auctionId);

        const auction: AuctionFull = { ...rawAuction };

        return auction;
    }

    async getMyParticipation(auctionId: string): Promise<{
        isParticipant: boolean;
        pseudonym: string | null;
    }> {
        const { isParticipant, pseudonym } = await this.get<MyParticipationDto>(
            '/' + auctionId + '/participation',
        );

        return {
            isParticipant,
            pseudonym: pseudonym ?? null,
        };
    }

    async makeBid(auctionId: string, total: number): Promise<void> {
        await this.post<MakeBidDto>('/' + auctionId + '/bids', { total });
    }
}
