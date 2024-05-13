"use client";
import Form from "@components/Form";
import { CreatePostDto } from "@dtos/api/post.dto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {};
const CreatePrompt = (props: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const [post, setPost] = useState<CreatePostDto>({
    prompt: "",
    tag: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session?.user) {
      setSubmitting(true);

      try {
        const response = await fetch("/api/prompts/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      onChangeTextArea={(e) => setPost({ ...post, prompt: e.target.value })}
      onChangeInput={(e) => setPost({ ...post, tag: e.target.value })}
      submitting={submitting}
      onSubmit={handleSubmit}
    />
  );
};
export default CreatePrompt;
