const ROUTES = {
  HOME: "/",
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  COLLECTION: "/collection",
  COMMUNITY: "/community",
  TAGS: "/tags",
  JOBS: "/jobs",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  ASK_QUESTION: "/ask-question",
  SIGN_IN_WITH_OAUTH: "/signin-with-oauth",
};

export default ROUTES;
