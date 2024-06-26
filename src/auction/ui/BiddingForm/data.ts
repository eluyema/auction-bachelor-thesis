import { BiddingFormState } from 'src/entities/auction/biddingFormState';

export const previewMessageMap = {
    [BiddingFormState.BEFORE_AUCTION_START]: [
        'Ви зареєстровані як учасник.',
        'До початку аукціону:',
    ],
    [BiddingFormState.BEFORE_ROUND_START]: 'До початку раунду 1:',
    [BiddingFormState.BEFORE_YOUR_TURN_START]: 'Ваш хід буде, через',
    [BiddingFormState.BIDDING_TIME_END]: 'Очікуйте завершення аукціону, через',
};
