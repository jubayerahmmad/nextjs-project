"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const SocialLogin = () => {
  const session = useSession();
  console.log(session);
  const router = useRouter();
  const handleSocialLogin = (providerName) => {
    signIn(providerName);
  };
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status]);
  return (
    <div className="flex justify-center gap-8">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGoogle />
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGithub />
      </button>
    </div>
  );
};

export default SocialLogin;
