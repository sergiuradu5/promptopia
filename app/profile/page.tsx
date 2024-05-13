"use client";
import Profile from "@components/Profile";
import { GetPostDto } from "@dtos/api/post.dto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type Props = {};

const MyProfile = (props: Props) => {
  const [posts, setPosts] = useState<GetPostDto[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const posts = await response.json();
      setPosts(posts);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (promptId: string) => {
    router.push(`/update-prompt/${promptId}`);
  };

  const handleDelete = async (promptId: string) => {
    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const filteredPosts = posts.filter((p) => p._id !== promptId);
        setPosts(filteredPosts);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleTagClick = (tag: string) => {
    router.push("/" + `?tag=${tag}`);
  };

  return (
    <Profile
      type="currentUser"
      name="My"
      desc="Welcome to your personalized profile page"
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
};
export default MyProfile;
