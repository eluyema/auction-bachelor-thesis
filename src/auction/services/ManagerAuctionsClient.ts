import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { AuctionInfo } from 'src/entities/auction/auctionInfo';
import { AuctionInfoDto } from './dto/auctionInfoDto';
import { AuctionFull } from 'src/entities/auction/auctionFull';
import { AuctionFullDto } from './dto/auctionFullDto';
import { AddInitialBidForUserDto } from './dto/addInitialBidDto';
import { CreateAuctionDto } from './dto/createAuctionDto';

export class ManagerAuctionClient extends HttpClient {
    async getMyAuctions() {
        const rawAuctions = await this.get<AuctionInfoDto[]>('/my');

        const auctions: AuctionInfo[] = rawAuctions.map((data) => ({ ...data }));

        return auctions;
    }

    async getFullAccessAuction(auctionId: string) {
        const dto = await this.get<AuctionFullDto>(`/admin/${auctionId}`);

        const auctionFull: AuctionFull = { ...dto };

        return auctionFull;
    }

    async addInitialBidForUser(data: { auctionId: string; userId: string; total: number }) {
        const { auctionId, userId, total } = data;
        await this.post<AddInitialBidForUserDto>(`/${auctionId}/${userId}/initial-bid`, { total });
    }

    async removeInitialBidForUser(data: { auctionId: string; userId: string }) {
        const { auctionId, userId } = data;

        await this.delete(`/${auctionId}/${userId}/initial-bid`);
    }

    async createAuction(data: CreateAuctionDto) {
        const auction = this.post<CreateAuctionDto, AuctionInfo>('/', data);

        return auction;
    }

    async removeAuction(data: { auctionId: string }) {
        const { auctionId } = data;

        await this.delete(`/${auctionId}`);
    }
}
