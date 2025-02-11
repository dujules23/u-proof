"use client";

import Input from "@/components/common/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { BiLoader } from "react-icons/bi";

interface Props {}

const Login: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", { redirect: false, email });

    if (response?.error) {
      setError(response.error);
      setLoading(false);
      console.log(error);
    } else {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center max-w-xl m-auto mt-16 pt-32">
      <div className="bg-nav dark:bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-3">
        <h2 className="text-2xl font-semibold text-center text-primary-light dark:text-primary-dark">
          Sign In
        </h2>
        <form id="login" className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className={
                "block font-bold mb-2 text-primary-light dark:text-primary-dark"
              }
            >
              Email:
            </label>
            <input
              id="email"
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black dark:bg-primary-light"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {error && (
              <div id="error-message" className="mt-4 text-red-600">
                <p>{error}</p>
              </div>
            )}
          </div>
          <div className="">
            <button
              id="submit"
              onClick={handleSubmit}
              type="submit"
              className="flex items-center justify-center w-full bg-white dark:bg-nav text-primary-dark dark:text-white py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-400 transition"
            >
              Sign In
              {loading && <BiLoader className="animate-spin" size={20} />}
            </button>
          </div>
        </form>
        {/* <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="text-sm text-white dark:text-gray-500 mx-4">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <button
          className="w-full flex items-center justify-center py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-400 transition bg-white dark:bg-nav text-primary-dark dark:text-primary-light"
          onClick={() => signIn("google")}
        >
          <Image
            src="/google-icon.png"
            alt="Google icon"
            className="w-6 h-6 mr-3"
            width={500}
            height={500}
          />
          Sign in with Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
