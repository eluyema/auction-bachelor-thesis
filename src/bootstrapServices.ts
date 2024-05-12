import { ManagerAuctionClient } from './auction/services/ManagerAuctionsClient';
import { AuthClient } from './auth/services/AuthClient';
import { config } from './config';
import { UsersClient } from './users/services/usersClient';

export interface Services {
    authClient: AuthClient;
    usersClient: UsersClient;
    managerAuctionClient: ManagerAuctionClient;
}

export const bootstrapServices = (): Services => {
    const authClient = new AuthClient(config.apiUrl, '/auth');
    const usersClient = new UsersClient(config.apiUrl, '/users');
    const managerAuctionClient = new ManagerAuctionClient(config.apiUrl, '/auctions');

    return { authClient, usersClient, managerAuctionClient };
};
