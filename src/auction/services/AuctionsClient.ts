import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { AuctionInfoDto } from './dto/auctionInfoDto';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';

export class AuctionClient extends HttpClient {
    async getMyAuctions() {
        const rawAuctions = await this.get<AuctionInfoDto[]>('/');

        const auctions: AuctionInfo[] = rawAuctions.map((data) => ({ ...data }));

        return auctions;
    }
}
