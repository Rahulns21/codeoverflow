import { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "Home",
  description:
    "Discover different programming questions and answers with recommendations from the community",
};

export const communityMetadata: Metadata = {
  title: "Community",
  description: "Discover and connect with talented developers in the CodeOverflow community. Explore developer profiles, skills, and contributions.",
  openGraph: {
    title: "Community | CodeOverflow",
    description: "Discover and connect with talented developers in the CodeOverflow community.",
    siteName: "CodeOverflow",
  },
};

export const collectionMetadata: Metadata = {
  title: "My Collection",
  description:
    "View all the questions you have bookmarked and saved on CodeOverflow. Access your favorite topics and discussions in one place.",
};

export const tagsMetadata: Metadata = {
  title: "Popular Tags",
  description:
    "Explore the most popular programming tags and technologies on CodeOverflow. Discover trending topics in React, JavaScript, TypeScript, Python, and more.",
};

export const profileMetadata: Metadata = {
  title: "My Profile",
  description: "View your personal profile, contributions, and reputation on CodeOverflow.",
};

export const askQuestionMetadata: Metadata = {
  title: "Ask a Question | CodeOverflow",
  robots: {
    index: false,
    follow: false,
  },
};