export type CreatePostDto = {
  prompt: string;
  tag: string;
};

export type UpdatePostDto = {
  prompt: string;
  tag: string;
};

export type GetPostDto = {
  _id: string;
  prompt: string;
  tag: string;
  creator: GetPostCreatorDto;
};

type GetPostCreatorDto = {
  _id: string;
  image: string;
  username: string;
  email: string;
};

export type GetCurrentUserPostDto = {
  _id: string;
  prompt: string;
  tag: string;
};
