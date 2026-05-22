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

export interface AuthCredentials {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface CreateQuestionParams {
    title: string;
    content: string;
    tags: string[];
}