import { GetPostDto } from "@dtos/api/post.dto";
import PromptCard from "./PromptCard";

type Props = {
  posts: GetPostDto[];
  onTagClick: (tag: string) => void;
  onUserClick?: (userId: string) => void;
};
const PromptCardList = ({ posts, onTagClick, onUserClick }: Props) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          onTagClick={onTagClick}
          onUserClick={onUserClick}
        />
      ))}
    </div>
  );
};
export default PromptCardList;
