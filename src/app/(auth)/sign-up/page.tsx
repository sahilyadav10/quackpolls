"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

import Button from "@/components/generic/Button";
import Input from "@/components/generic/Input";
import Logo from "@/components/icons/Logo";
import { routes } from "@/lib/routes";
import { useAuth } from "@/hooks/useAuth";
import { SignUpData } from "@/service/auth";
import { signUpValidation } from "@/lib/validations";
import { useUser } from "@/hooks/useUser";

const schema: yup.ObjectSchema<SignUpData> = signUpValidation;
type FormData = yup.InferType<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isAuthenticated, error, isLoading } = useAuth();
  const { isUserLoading, error: userError, fetchUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: undefined,
      gender: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(routes.dashboard.pathname);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: "sign-up-error" });
    }
  }, [error, userError]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await signUp(data);
    await fetchUser();
  };

  return (
    <div className="flex items-center justify-center h-screen p-8">
      <div className="flex gap-4 justify-between p-4 md:p-8 rounded-2xl items-center bg-neutral-50 shadow-2xl w-full md:max-w-3xl">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center justify-center">
              <Logo height={20} width={20} />
              <h1 className="text-2xl font-bold"> QuackPolls</h1>
            </div>
            <p className="text-neutral-500">
              Create an account and get quacking!
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 flex-col"
            noValidate
          >
            <div className="flex gap-2">
              <Input
                label="First Name"
                type="text"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                type="text"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
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
            <div className="flex gap-2">
              <Input
                label="Age"
                type="number"
                {...register("age")}
                error={errors.age?.message}
              />
              <Input
                label="Gender"
                type="text"
                {...register("gender")}
                error={errors.gender?.message}
              />
            </div>
            <Button
              type="submit"
              className="justify-center mt-4"
              isLoading={isLoading || isUserLoading}
            >
              Sign Up
            </Button>
            <p className="text-sm">
              Have an account?{" "}
              <span
                className="underline cursor-pointer hover:no-underline"
                role="button"
                onClick={() => {
                  router.push(routes.signIn.pathname);
                }}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
        <div className="hidden md:block">
          <Image
            src="/sign-up.png"
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
