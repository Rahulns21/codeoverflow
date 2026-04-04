import HomeFilter from "@/components/filters/HomeFilter";
import SearchIcon from "@/components/icons/SearchIcon";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import Link from "next/link";

const questions = [
    { _id: "1", title: "How to learn React?",
      description: "I want to learn React, can anyone help me?",
      tags: [
        { _id: "1", name: "React" },
        { _id: "2", name: "JavaScript" },
        { _id: "3", name: "TypeScript" }
      ],
      author: { _id: "1", name: "John Doe" },
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date(),
    },
    { _id: "2", title: "Is typescript better than javascript?",
      description: "Can anyone explain me why typescript is better than javascript",
      tags: [
        { _id: "1", name: "JavaScript" },
        { _id: "2", name: "TypeScript" },
        { _id: "3", name: "Node" }
      ],
      author: { _id: "2", name: "" },
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date(),
    },
    { _id: "3", title: "What db should i use?",
      description: "I want to learn React, can anyone help me?",
      tags: [
        { _id: "1", name: "Postgresql" },
        { _id: "2", name: "MySql" },
        { _id: "3", name: "MongoDB" }
      ],
      author: { _id: "3", name: "Rahul NS" },
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date(),
    }
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;
  const normalizedQuery = query.toLowerCase();
  const normalizedFilter = filter.toLowerCase();

  const filteredQuestions = questions.filter((question) => {
    const titleMatches = question.title
      .toLowerCase()
      .includes(normalizedQuery);

    const filterMatches = 
      !normalizedFilter ||
      question.tags.some(
        (tag) => tag.name.toLowerCase() === normalizedFilter
      );

    return titleMatches && filterMatches;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between 
      gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient min-h-11.5 px-4 py-3 text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTION}>
            Ask a Question
          </Link>
        </Button>
      </section>

      <section className="mt-11 max-w-4xl mx-auto">
        <LocalSearch icon={<SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />} />
      </section>
      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
