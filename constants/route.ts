const ROUTES = {
    HOME: '/',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
    TAGS: (id: string) => `/tags/${id}`,
    ASK_QUESTION: "/ask-question",
    SIGN_IN_WITH_OAUTH: "/signin-with-oauth",
}

export default ROUTES;