"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Button from "@/components/generic/Button";
import Input from "@/components/generic/Input";
import Logo from "@/components/icons/Logo";
import { routes } from "@/lib/routes";
import { SignInCredentials } from "@/service/auth";
import { signInValidation } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const schema: yup.ObjectSchema<SignInCredentials> = signInValidation;
type FormData = yup.InferType<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isAuthenticated, error, isLoading } = useAuth();
  const { isUserLoading, error: userError, fetchUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(routes.polls.pathname);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error || userError) {
      toast.error(error, { toastId: "sign-in-error" });
    }
  }, [error, userError]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await signIn(data);
    await fetchUser();
  };

  return (
    <div className="flex items-center justify-center h-screen p-8">
      <div className="flex gap-4 justify-between p-4 md:p-8 rounded-2xl items-center bg-neutral-50 shadow-2xl w-full md:max-w-3xl">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center justify-center">
              <Logo height={20} width={20} />
              <h1 className="text-2xl font-bold">QuackPolls</h1>
            </div>
            <p className="text-neutral-500">
              Sign in to your QuackPolls account
            </p>
          </div>
          <div className="flex gap-2 flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 flex-col"
              noValidate
            >
              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              <Button
                className="justify-center mt-4"
                isLoading={isLoading || isUserLoading}
              >
                Sign In
              </Button>
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <span
                  className="underline cursor-pointer hover:no-underline"
                  role="button"
                  onClick={() => {
                    router.push(routes.signUp.pathname);
                  }}
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/sign-in.png"
            width={400}
            height={400}
            alt='A Duck with "Sign In" Pluck Card'
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
