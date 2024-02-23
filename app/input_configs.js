import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid Email" });

const passwordSchema = z.string().min(8, "Password should be at least 8 characters long").max(32, "Password should be at max 32 characters long").refine((password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/;

  return passwordRegex.test(password);
}, {
  message: "Invalid password format: Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"
});

export const signUpSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: emailSchema,
  password: passwordSchema,
  confirm_password: z.string()
}).refine((fields) =>fields.password === fields.confirm_password, {
  path: ["confirmPassword"],
  message: "Passwords don't match"
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string({required_error: true}),
});