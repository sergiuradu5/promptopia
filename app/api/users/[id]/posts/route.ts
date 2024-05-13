import { Prompt } from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connectToDb();
    const { id } = params;
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
