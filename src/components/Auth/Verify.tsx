import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const navigate = useNavigate();

  const [resendAvailable, setResendAvailable] = useState(false); // State untuk kontrol tombol resend
  const [timer, setTimer] = useState(60); // Timer awal 60 detik
  const [Loading, setLoading] = useState(false);

  // Mulai hitungan mundur saat komponen dimuat
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
    } else {
      setResendAvailable(true); // Tampilkan tombol resend setelah timer selesai
    }
  }, [timer]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const email = Cookies.get("email");

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/auth/verify-otp", {
        email,
        otp: data.pin,
      });

      toast({
        title: "Success",
        description: "OTP verified successfully.",
        variant: "success",
      });
      navigate("/");
      Cookies.remove("email");
      setLoading(false);
    } catch (error: any) {
      if (error.response.status == 400) {
        toast({
          title: "Error",
          description: "Your OTP is invalid.",
          variant: "destructive",
        });

        setLoading(false);
      } else {
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
        });

        setLoading(false);
      }
    }
  }

  // Fungsi untuk mengirim ulang OTP
  const handleResendOTP = async () => {
    const email = Cookies.get("email");
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/auth/resend-verify-token", {
        email,
      });

      toast({
        title: "Success",
        description: "OTP has been resent to your email.",
        variant: "success",
      });

      // Reset timer dan sembunyikan tombol resend lagi
      setResendAvailable(false);
      setTimer(60);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to resend OTP",
        variant: "destructive",
      });

      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <div className="flex flex-col items-center space-y-2">
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="flex justify-center w-full"
                  >
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
            />

            <Button type="submit" disabled={Loading} className="w-full">
              {Loading ? "Loading..." : "Verify OTP"}
            </Button>

            {resendAvailable ? (
              <Button
                type="button"
                disabled={Loading}
                className="w-full mt-4"
                onClick={handleResendOTP}
              >
                {Loading ? "Loading..." : "Resend OTP"}
              </Button>
            ) : (
              <p className="text-center text-red-500">
                Resend OTP in {timer} seconds
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
