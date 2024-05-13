import { Prompt } from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: Params }
) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params: { id } }: { params: Params }
) => {
  try {
    await connectToDb();

    const { prompt, tag } = await req.json();

    const existingPrompt = await Prompt.findById(id).populate("creator");

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.tag = tag;
    existingPrompt.prompt = prompt;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params: { id } }: { params: Params }
) => {
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(id).populate("creator");

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    await Prompt.deleteOne({ _id: id });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
