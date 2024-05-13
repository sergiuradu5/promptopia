"use client";

import { GetPostDto } from "@dtos/api/post.dto";
import { useRouter } from "next/navigation";
import MyPromptCard from "./MyPromptCard";

type Props = {
  type: "currentUser" | "otherUser";
  name: string;
  desc: string;
  posts: GetPostDto[];
  handleEdit?: (postId: string) => void;
  handleDelete?: (postId: string) => void;
  handleTagClick: (tag: string) => void;
};
const Profile = ({
  type,
  name,
  desc,
  posts,
  handleEdit,
  handleDelete,
  handleTagClick,
}: Props) => {
  const router = useRouter();

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {posts.map((post) => (
          <MyPromptCard
            type={type}
            key={post._id}
            post={post}
            onTagClick={handleTagClick}
            onEdit={() => handleEdit?.(post._id)}
            onDelete={() => handleDelete?.(post._id)}
          />
        ))}
      </div>
    </section>
  );
};
export default Profile;
