import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is requried"],
  },
  tag: {
    type: String,
    required: [true, "Tag is requried"],
  },
});

export const Prompt = models.Prompt || model("Prompt", PromptSchema);
