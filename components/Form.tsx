import { CreatePostDto } from "@custom-types/api/create-post.dto";
import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";

type Props = {
  type: string;
  post: CreatePostDto;
  onChangeTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => any;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => any;
  submitting: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
const Form = ({
  type,
  post,
  submitting,
  onChangeTextArea,
  onChangeInput,
  onSubmit,
}: Props) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={onSubmit}
      >
        <label>
          <span className="font satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={onChangeTextArea}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="font satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              {" "}
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={onChangeInput}
            placeholder="#tag"
            required
            className="form_input"
          ></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}{" "}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
