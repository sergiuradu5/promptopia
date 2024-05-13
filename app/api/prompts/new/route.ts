import { Prompt } from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const { userId, prompt, tag } = await req.json();
  
  try {
    await connectToDb();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to create a new response", { status: 500 });
  }
};
