"use client";
import Link from "next/link";
import SocialLogin from "../login/components/SocialLogin";
import { registerUser } from "../actions/auth/registerUser";

const RegisterForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const userData = { name, email, password };
    await registerUser(userData);

    // const addUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // });
    // console.log(addUser);
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
      <label className="w-full">
        <div className="w-full">
          <span className="font-bold">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="p-2 outline-none border round w-full"
          name="name"
        />
      </label>
      <label className="w-full">
        <div className="w-full">
          <span className="font-bold">Email</span>
        </div>
        <input
          type="text"
          name="email"
          placeholder="Type here"
          className="p-2 outline-none border round w-full"
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
          className="p-2 outline-none border round w-full"
        />
      </label>
      <button className="w-full p-2 bg-orange-500 hover:bg-orange-700 text-white font-bold">
        Sign Up
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin />
      <p className="text-center">
        Don't Have an account?{" "}
        <Link href="/login" className="text-orange-500 font-bold">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
