import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const Home: NextPage = () => {
  const lastElementRef = useRef<HTMLDivElement>(null);
  const { data, error, fetchNextPage, isLoading, refetch, isFetchingNextPage } =
    useInfiniteScroll(lastElementRef);

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  const goToUserProfile = (id: number) => {
    router.push(`/user/${id}`);
  };

  return (
    <div className="flex flex-col m-5">
      {data?.map((post) => {
        return (
          <div key={post.id} className="my-10">
            <button
              onClick={() => {
                goToUserProfile(post.userId);
              }}
            >
              <h1 className="font-bold text-xl">{post.title}</h1>
            </button>
            <p>{post.body}</p>
          </div>
        );
      })}
      {isFetchingNextPage && <div>Loading...</div>}
      <div className="h-10 w-full" ref={lastElementRef} />
    </div>
  );
};

export default Home;
