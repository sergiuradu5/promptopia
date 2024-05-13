"use client";
import Profile from "@components/Profile";
import { GetPostDto } from "@dtos/api/post.dto";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [posts, setPosts] = useState<GetPostDto[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const { id: userId } = useParams<{ id: string }>();

  const type = session?.user.id === userId ? "currentUser" : "otherUser";

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const posts = await response.json();
      setPosts(posts);
    };

    if (userId) fetchPosts();
  }, [userId]);

  const handleTagClick = (tag: string) => {
    router.push("/" + `?tag=${tag}`);
  };

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

  return type === "otherUser" ? (
    <Profile
      type={type}
      name="User"
      desc="View all posts made by user"
      posts={posts}
      handleTagClick={handleTagClick}
    />
  ) : (
    <Profile
      type={type}
      name="My"
      desc="View all posts made by you"
      posts={posts}
      handleTagClick={handleTagClick}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default UserProfile;
