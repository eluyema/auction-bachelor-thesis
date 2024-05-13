import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { AuctionInfoDto } from './dto/auctionInfoDto';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionFullDto } from './dto/auctionFullDto';

export class AuctionClient extends HttpClient {
    async getAllAuctions() {
        const rawAuctions = await this.get<AuctionInfoDto[]>('/');

        const auctions: AuctionInfo[] = rawAuctions.map((data) => ({ ...data }));

        return auctions;
    }

    async getAuctionById(auctionId: string): Promise<AuctionFull> {
        const rawAuction = await this.get<AuctionFullDto>('/public/' + auctionId);

        const auction: AuctionFull = { ...rawAuction };

        return auction;
    }
}
