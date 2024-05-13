import Feed from "@components/Feed";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"></br>
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Feed />
      </Suspense>
    </section>
  );
}
