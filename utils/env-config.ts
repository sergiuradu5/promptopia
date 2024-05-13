import { z } from "zod";

const googleSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

const googleEnv = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const mongoDbSchema = z.object({
  uri: z.string().url(),
});

const mongoDbEnv = {
  uri: process.env.MONGODB_URI,
};

const nextAuthSchema = z.object({
  url: z.string().url(),
  urlInternal: z.string().url(),
  secret: z.string(),
});

const nextAuthEnv = {
  url: process.env.NEXTAUTH_URL,
  urlInternal: process.env.NEXTAUTH_URL_INTERNAL,
  secret: process.env.NEXTAUTH_SECRET,
};

const envSchema = z.object({
  google: googleSchema,
  mongoDb: mongoDbSchema,
  nextAuth: nextAuthSchema,
});

const envSchemaResult = envSchema.safeParse({
  google: googleEnv,
  mongoDb: mongoDbEnv,
  nextAuth: nextAuthEnv,
});

if (!envSchemaResult.success) {
  console.error(envSchemaResult.error.issues);
  throw new Error("Error with environment variables");
}

export const env = envSchemaResult.data;
