"use server";

import { AuthError } from "next-auth";

import { signIn } from "~/auth";
import { getUserByEmail } from "~/data/user";
import { sendVerificationEmail } from "~/lib/email";
import { db } from "~/lib/db";
import { generatePasscode } from "~/lib/token";
import { saltAndHash } from "~/lib/utils";
import {
  SignInSchema,
  signInSchema,
  signUpSchema,
  SignUpSchema,
} from "~/lib/zod-schemas";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const register = async (values: SignUpSchema) => {
  const validatedFields = signUpSchema.parse(values);

  if (!validatedFields) return { error: "Invalid fields" };

  const { email, password, name } = validatedFields;
  const hashedPassword = await saltAndHash(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already exists!" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generatePasscode(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.otp);

  return { success: "Confirmation email sent!" };
};

export const login = async (values: SignInSchema, callback?: string | null) => {
  const validatedFields = signInSchema.parse(values);

  if (!validatedFields) return { error: "Invalid fields" };

  const { email, password } = validatedFields;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generatePasscode(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.otp);

    return { success: "Confirmation email sent again!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callback || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};