import { User } from './user.entity';

export const authProviders = [
    {
        provide: 'AUTH_REPOSITORY',
        useValue: User,
    },
];