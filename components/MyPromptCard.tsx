"use client";

import { GetPostDto } from "@dtos/api/post.dto";
import Image from "next/image";
import { useState } from "react";
import DeletePromptModal from "./DeletePromptModal";
type Props = {
  type: "currentUser" | "otherUser";
  post: GetPostDto;
  onTagClick?: (tag: string) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const MyPromptCard = ({ post, onTagClick, onEdit, onDelete, type }: Props) => {
  const [copied, setCopied] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCopy = () => {
    setCopied(post._id);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="prompt_card">
      {isDeleteModalOpen && (
        <DeletePromptModal
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
        />
      )}
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
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
      {type === "currentUser" && (
        <div className="flex flex-center mt-5 pt-3 border-t border-gray-100 gap-4">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={onEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleOpenDeleteModal}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default MyPromptCard;
