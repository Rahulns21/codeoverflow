"use client";

import Link from "next/link";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
  Path,
  DefaultValues,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/route";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
};

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}


const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  fields,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (!result.success) {
      console.error("Auth failed");
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

  const toggleVisibility = (name: string) => {
    setVisibleFields((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit as SubmitHandler<FieldValues>)}
      className="mt-10 space-y-6"
    >
      <FieldGroup>
        {fields.map(({ name, label, type }) => (
          <Controller
            key={String(name)}
            name={name}
            control={form.control}
            render={({ field, fieldState }) => {
              const isPassword = type === "password" || (!type && String(name).toLowerCase().includes("password"));
              const isVisible = visibleFields[String(name)];

              return (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel>{label}</FieldLabel>
                  <div className="relative">
                    <Input 
                      {...field}
                      required
                      type={isPassword ? (isVisible ? "text" : "password") : type || "text"}
                      aria-invalid={fieldState.invalid || undefined}
                      className="pr-10"
                      onChange={(e) => {
                        field.onChange(e);
                        if (!e.target.value) {
                          setVisibleFields((prev) => ({ ...prev, [String(name)]: false }))
                        }
                      }}
                      />
                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => toggleVisibility(String(name))}
                        disabled={!field.value}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={isVisible ? "Hide password" : "Show password"}>
                          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    )}
                  </div>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )
            }}
          />
        ))}
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="primary-gradient min-h-12 w-full cursor-pointer text-light-900!"
      >
        {form.formState.isSubmitting
          ? formType === "SIGN_IN"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link href={ROUTES.SIGN_UP} className="primary-text-gradient">
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link href={ROUTES.SIGN_IN} className="primary-text-gradient">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
