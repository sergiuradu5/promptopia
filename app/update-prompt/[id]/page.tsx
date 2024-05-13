"use client";
import Form from "@components/Form";
import { UpdatePostDto } from "@dtos/api/post.dto";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Props = {};
const UpdatePrompt = (props: Props) => {
  const router = useRouter();
  const { id: promptId } = useParams<{ id: string }>();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<UpdatePostDto>({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();

  useEffect(() => {
    const getPrompt = async () => {
      const response = await fetch(`/api/prompts/${promptId}`);
      const data = await response.json();

      console.log("data", data);

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPrompt();
  }, [promptId]);

  const handleUpdatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session?.user) {
      setSubmitting(true);

      try {
        const updatePromptDto: UpdatePostDto = {
          prompt: post.prompt,
          tag: post.tag,
        };
        const response = await fetch(`/api/prompts/${promptId}`, {
          method: "PATCH",
          body: JSON.stringify(updatePromptDto),
        });

        if (response.ok) {
          router.back();
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
      type="Edit"
      post={post}
      onChangeTextArea={(e) => setPost({ ...post, prompt: e.target.value })}
      onChangeInput={(e) => setPost({ ...post, tag: e.target.value })}
      submitting={submitting}
      onSubmit={handleUpdatePrompt}
    />
  );
};
export default UpdatePrompt;
