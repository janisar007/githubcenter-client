

// const formSchema = z
//   .object({
//     username: z.string().min(1, "Username is required"),
//     email: z.string().email("Invalid email"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     confirmPassword: z.string(),
//     organization: z.string().min(1, "Organization is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

import Signup from "@/components/common/Signup";

// type FormData = z.infer<typeof formSchema>;

export const Register = () => {
  

  return (

    <Signup/>
    
  );
};
