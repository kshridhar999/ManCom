import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid Email' });

const passwordSchema = z
  .string()
  .min(8, 'Password should be at least 8 characters long')
  .max(32, 'Password should be at max 32 characters long')
  .refine(
    (password) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/;

      return passwordRegex.test(password);
    },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    }
  );

export const signUpSchema = z
  .object({
    user_type: z
      .string()
      .refine((val) => ['customer', 'service_provider'].includes(val), {
        message: 'User type must be selected',
      }),
    first_name: z.string().trim().min(1, 'First name cant be empty'),
    middle_name: z.string().trim().optional(),
    last_name: z.string().trim().min(1, 'Last name cant be empty'),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((fields) => fields.password === fields.confirm_password, {
    path: ['confirm_password'],
    message: "Passwords don't match",
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error: true }),
});

export const forgotPwdSchema = z.object({
  email: emailSchema,
});

export const resetPwdSchema = z
  .object({
    new_password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((fields) => fields.new_password === fields.confirm_password, {
    path: ['confirm_password'],
    message: "Passwords don't match",
  });

export const udpateUserSchema = z.object({
  first_name: z.string().trim().min(1, 'First name cant be empty').optional(),
  middle_name: z.string().trim().optional(),
  last_name: z.string().trim().min(1, 'Last name cant be empty').optional(),
  password: passwordSchema.optional(),
});
