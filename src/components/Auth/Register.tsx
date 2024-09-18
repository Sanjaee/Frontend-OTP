import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastAction } from "../ui/toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Define validation schema with Zod
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // React Hook Form with Zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        data
      );
      console.log(response.data);
      Cookies.set("email", data.email, { expires: 1 });

      toast({
        description: "Please check your email and verify your account.",
        title: "Success",
        variant: "success",
      });

      navigate("/verify"); // Navigate to /verify on success
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate("/verify");
        toast({
          variant: "destructive",
          title: "Registration Error",
          description:
            "Your email address has not been verified. Please check your inbox for the verification email or resend it.",
          action: <ToastAction altText="Resend Email">Resend Email</ToastAction>,
        });
      } else if (error.response?.status === 409) {
        toast({
          variant: "destructive",
          title: "Registration Error",
          description:
            "The email address you provided is already registered and verified. Please try logging in or use a different email address.",
          action: <ToastAction altText="Login">Login</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something Went Wrong",
          description:
            "An unexpected error occurred during registration. Please try again later.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Create an Account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer "
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={20} />
                      ) : (
                        <AiFillEye size={20} />
                      )}
                    </div>
                  </div>
                  <FormMessage />
            
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        {/* Link to Login */}
        <p className="text-center text-gray-500 text-sm mt-10">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
