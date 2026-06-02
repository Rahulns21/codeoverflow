import { RouteParams } from "@/app/types/global";
import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/route";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";
import { SearchIcon } from "lucide-react";

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) | 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAGS}
          icon={
            <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          }
          placeholder="Search tags..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={tags}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} />
            ))}
          </div>
        )}
      />

      <div className="fixed bottom-0 left-0 z-50 bg-black p-2 text-xs text-white">
        <span className="sm:hidden">xs (&lt;640px)</span>
        <span className="hidden sm:inline md:hidden">sm (640px)</span>
        <span className="hidden md:inline lg:hidden">md (768px)</span>
        <span className="hidden lg:inline xl:hidden">lg (1024px)</span>
        <span className="hidden xl:inline 2xl:hidden">xl (1280px)</span>
        <span className="hidden 2xl:inline">2xl (1536px)</span>
      </div>
    </>
  );
};

export default Tags;
