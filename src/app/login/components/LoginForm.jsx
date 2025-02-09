"use client";
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res.ok) {
        router.push("/");
        form.reset();
        toast.success("Login Successful");
      } else {
        toast.error("Authentication Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Authentication Failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
      <label className="w-full">
        <div className="w-full">
          <span className="font-bold">Email</span>
        </div>
        <input
          type="text"
          name="email"
          placeholder="Type here"
          className="p-2 outline-none border rounded-md w-full"
        />
      </label>
      <label className="w-full">
        <div className="w-full">
          <span className="font-bold">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Type here"
          className="p-2 outline-none border rounded-md w-full"
        />
      </label>
      <button className="w-full h-12 bg-orange-500 text-white font-bold">
        Sign In
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin />
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/register" className="text-orange-500 font-bold">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
