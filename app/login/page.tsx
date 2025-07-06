"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/common/LoginForm";

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
      <LoginForm
        email={email}
        error={error}
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        loading={loading}
      />
    </div>
  );
};

export default Login;
