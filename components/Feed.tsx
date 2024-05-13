"use client";
import { GetPostDto } from "@dtos/api/post.dto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

type Props = {};
const Feed = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [filteredPosts, setFilteredPosts] = useState<GetPostDto[]>([]);
  const [posts, setPosts] = useState<GetPostDto[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompts");
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
      if (tag) {
        const filteredPosts = filterPostsByTag(tag, fetchedPosts);
        setFilteredPosts(filteredPosts);
      }
    };

    fetchPosts();
  }, [tag]);

  const filterPostsByTag = (tagInput: string, posts: GetPostDto[]) => {
    const regex = new RegExp(tagInput, "i"); // 'i' flag for case-insensitive search
    return posts.filter((p) => regex.test(p.tag));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearInterval(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = searchPrompts(e.target.value);
        setFilteredPosts(searchResults);
        router.push(pathname + `?search=${e.target.value}`);
      }, 500)
    );
  };

  const searchPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (p) =>
        regex.test(p.creator.username) ||
        regex.test(p.creator.email) ||
        regex.test(p.prompt) ||
        regex.test(p.tag)
    );
  };

  const handleTagClick = (tag: string) => {
    router.push(pathname + `?tag=${tag}`);
  };

  const handleUserClick = (userId: string) => {
    router.push("profile/" + userId);
  };

  return (
    <section className="feed">
      {posts.length === 0 ? (
        <p className="desc text-center">
          No posts yet...
          <br /> Create a post to see all posts available here.
        </p>
      ) : (
        <>
          <form className="relative w-full flex-center">
            <input
              className="search_input peer"
              type="text"
              placeholder="Search for a tag or a username"
              value={searchText}
              onChange={handleSearchChange}
              required
            />
          </form>
          {searchText && (
            <PromptCardList
              posts={filteredPosts}
              onTagClick={handleTagClick}
              onUserClick={handleUserClick}
            />
          )}
          {tag && (
            <PromptCardList
              posts={filteredPosts}
              onTagClick={handleTagClick}
              onUserClick={handleUserClick}
            />
          )}
          {!searchText.length && !tag && (
            <PromptCardList
              posts={posts}
              onTagClick={handleTagClick}
              onUserClick={handleUserClick}
            />
          )}
        </>
      )}
    </section>
  );
};
export default Feed;
