import { Refresh_Token } from './refresh-token.entity';

export const refreshTokenProviders = [
    {
        provide: 'TOKEN_REPOSITORY',
        useValue: Refresh_Token,
    },
];