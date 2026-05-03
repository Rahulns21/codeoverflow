export type Provider = 'github' | 'google';

export interface SignInWithOAuthParams {
    provider: Provider;
    providerAccountId: string;
    user: {
        email: string;
        name: string;
        image: string;
        username: string;
    }
} 