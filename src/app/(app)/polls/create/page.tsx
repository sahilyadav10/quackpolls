"use client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/generic/Input";
import { pollValidations } from "@/lib/validations";
import { PollForm, PollPrivacy } from "@/types/poll";
import Button from "@/components/generic/Button";
import { Toggle } from "@/components/generic/Toggle";
import { DateInput } from "@/components/generic/DateInput";
import { createPoll } from "@/service/polls";

const schema: yup.ObjectSchema<PollForm> = pollValidations;
type FormData = yup.InferType<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      question: "",
      pollPrivacy: PollPrivacy.Private,
      closeTime: undefined,
      options: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createPoll(data);
  };
  return (
    <div className="flex gap-8 flex-col items-center w-2/3 max-[400px] place-self-center">
      <div className="flex w-full items-start">
        <h1 className="font-semibold text-2xl text-left">Hatch a New Poll</h1>
      </div>
      <div className="flex flex-col gap-4 w-full bg-white p-8 pr-12 rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-6 flex-col"
          noValidate
        >
          <Input
            label="Question"
            type="text"
            {...register("question")}
            error={errors.question?.message}
          />
          <div className="flex gap-2 flex-col">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 relative">
                <Input
                  label={`Option ${index + 1}`}
                  {...register(`options.${index}.value`)}
                  error={errors.options?.[index]?.value?.message}
                  className="flex-1"
                />

                <Button
                  variant="plain"
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm absolute -right-9 top-7"
                >
                  ✕
                </Button>
              </div>
            ))}
            <div className="place-self-end mt-2">
              {fields.length < 10 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ value: "" })}
                  className="text-sm"
                >
                  + Add Option
                </Button>
              )}
            </div>
          </div>

          <Toggle
            label="Poll Privacy"
            options={Object.values(PollPrivacy)}
            value={watch("pollPrivacy")}
            onChange={(val) => setValue("pollPrivacy", val)}
            error={errors.pollPrivacy?.message}
          />
          <DateInput
            label="Closing time"
            value={watch("closeTime")}
            onChange={(val) => setValue("closeTime", val)}
            error={errors.closeTime?.message}
          />
          <Button className="place-self-end">Publish Poll</Button>
        </form>
      </div>
    </div>
  );
}
