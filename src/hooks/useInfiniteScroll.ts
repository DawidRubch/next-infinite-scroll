import { useEffect, type RefObject } from "react";
import { api } from "../utils/api";

export const useInfiniteScroll = (lastElementRef: RefObject<HTMLDivElement>) => {
    const { data, error, fetchNextPage, isLoading, ...props } = api.posts.getPosts.useInfiniteQuery({
        take: 10,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 0,
        refetchOnWindowFocus: false,
    })


    useEffect(() => {
        const lastElement = lastElementRef?.current;
        if (!lastElement || isLoading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    fetchNextPage();
                }
            },
            {
                threshold: 0.5,
            }
        );
        observer.observe(lastElement);

        return () => {
            observer.disconnect();
        };
    }, [lastElementRef?.current, fetchNextPage, isLoading]);


    return {
        data: data?.pages.flatMap((page) => page.posts),
        error,
        fetchNextPage,
        isLoading,
        lastElementRef,
        ...props
    }

}