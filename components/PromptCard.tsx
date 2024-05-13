"use client";

import { GetPostDto } from "@dtos/api/post.dto";
import Image from "next/image";
import { useState } from "react";
type Props = {
  post: GetPostDto;
  onTagClick?: (tag: string) => void;
  onUserClick?: (userId: string) => void;
};

const PromptCard = ({ post, onTagClick, onUserClick }: Props) => {
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post._id);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
          onClick={() => onUserClick?.(post.creator._id)}
        >
          <Image
            className="rounded-full object-contain"
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="fonst-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <h3 className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post._id
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_button"
            height={14}
            width={14}
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => onTagClick?.(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};
export default PromptCard;
