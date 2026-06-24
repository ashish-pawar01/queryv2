import { useForm } from "react-hook-form";
import { Database, ShieldCheck } from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div
      className="
      min-h-screen
      grid
      lg:grid-cols-2
      bg-[var(--background)]
      "
    >
      {/* Left Section */}

      <div
        className="
        hidden
        lg:flex
        flex-col
        justify-center
        px-16
        relative
        overflow-hidden
        "
      >
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-blue-600/20
          via-purple-500/20
          to-cyan-500/20
          blur-3xl
          "
        />

        <div className="relative z-10">
          <div
            className="
            h-20
            w-20
            rounded-3xl
            bg-blue-600
            flex
            items-center
            justify-center
            "
          >
            <Database size={40} className="text-white" />
          </div>

          <h1
            className="
            mt-8
            text-6xl
            font-bold
            "
          >
            Query Master
          </h1>

          <p
            className="
            mt-6
            text-lg
            opacity-80
            max-w-xl
            "
          >
            Centralized Query Management Platform for creating, publishing and
            managing enterprise SQL definitions.
          </p>

          <div
            className="
            mt-12
            flex
            items-center
            gap-3
            "
          >
            <ShieldCheck />
            <span>Secure Role Based Access Control</span>
          </div>
        </div>
      </div>

      {/* Right Section */}

      <div
        className="
        flex
        items-center
        justify-center
        p-8
        "
      >
        <div
          className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          p-8
          shadow-2xl
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            "
          >
            Welcome Back
          </h2>

          <p
            className="
            mt-2
            opacity-60
            "
          >
            Sign in to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
            mt-8
            space-y-5
            "
          >
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
