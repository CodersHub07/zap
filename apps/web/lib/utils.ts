import bcrypt from "bcryptjs";

export const saltAndHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string | null,
) => {
  if (!hashedPassword) return false;

  return bcrypt.compare(password, hashedPassword);
};

export const encode = (data: string) => Buffer.from(data).toString("base64");
export const decode = (data: string) => Buffer.from(data, "base64").toString();

export const generateOTP = (): string => {
  return Math.random().toString().slice(2, 8);
};
