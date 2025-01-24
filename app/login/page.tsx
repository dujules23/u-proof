"use client";

import ActionButton from "@/components/buttons/ActionButton";
import Input from "@/components/common/Input";
import Image from "next/image";
import { FC } from "react";

interface Props {}

const Login: FC<Props> = (props): JSX.Element => {
  const handleSubmit = () => {};

  return (
    <div className="flex items-center justify-center max-w-xl m-auto mt-16 pt-32">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <form className="space-y-4">
          <div>
            {/* <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label> */}
            <Input
              inputName="Email"
              value={""}
              onChange={function (
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-nav text-white py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="text-sm text-gray-500 mx-4">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition text-black">
          <Image
            src="/google-icon.png"
            alt="Google icon"
            className="w-6 h-6 mr-3"
            width={500}
            height={500}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
