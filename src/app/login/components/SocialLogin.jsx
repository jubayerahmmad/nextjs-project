"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
  return (
    <div className="flex justify-center gap-8">
      <button
        type="button"
        //   onClick={() => handleSocialLogin("google")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGoogle />
      </button>
      <button
        type="button"
        //   onClick={() => handleSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGithub />
      </button>
    </div>
  );
};

export default SocialLogin;
