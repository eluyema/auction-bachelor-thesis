import { io, Socket } from 'socket.io-client';
import { RoundFull } from 'src/entities/round/RoundFull';

export class AuctionSocket {
    private socket: Socket | null = null;

    constructor(private url: string) {}

    initConnect(params: { auctionId: string }) {
        const { auctionId } = params;
        const auctionUrl = new URL(this.url);
        auctionUrl.searchParams.append('auctionId', auctionId);

        this.socket = io(auctionUrl.toString(), {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 1000,
        });
    }

    onRoundsUpdate(callback: (rounds: RoundFull[]) => void) {
        if (!this.socket) {
            return;
        }
        this.socket.on('roundsUpdate', ({ data }) => callback(data));
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
