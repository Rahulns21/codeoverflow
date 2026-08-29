"use client";

import { User } from "@/app/types/global";
import { updateUser } from "@/lib/actions/user.action";
import { UpdateUserSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ProfileFormProps {
    user: User;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof UpdateUserSchema>>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: user.name,
            username: user.username,
            email: user.email || "",
            bio: user.bio || "",
            location: user.location || "",
            portfolio: user.portfolio || "",
            image: user.image || "",
        },
    });

    const handleUpdate = async (values: z.infer<typeof UpdateUserSchema>) => {
        setIsSubmitting(true);
        try {
            const res = await updateUser(values);
            if (res.success) {
                router.push(`/profile/${user._id}`);
                router.refresh();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
    <form onSubmit={form.handleSubmit(handleUpdate)} className="mt-9 flex w-full flex-col gap-9">
      <Field>
        <FieldLabel>Name *</FieldLabel>
        <Input
          {...form.register("name")}
          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 border"
        />
        {form.formState.errors.name && (
          <FieldError>{form.formState.errors.name.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Username *</FieldLabel>
        <Input
          {...form.register("username")}
          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 border"
        />
        {form.formState.errors.username && (
          <FieldError>{form.formState.errors.username.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          {...form.register("email")}
          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 border"
        />
        {form.formState.errors.email && (
          <FieldError>{form.formState.errors.email.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea
          {...form.register("bio")}
          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 border"
        />
        {form.formState.errors.bio && (
          <FieldError>{form.formState.errors.bio.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Portfolio Link</FieldLabel>
        <Input
          {...form.register("portfolio")}
          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 border"
        />
        {form.formState.errors.portfolio && (
          <FieldError>{form.formState.errors.portfolio.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Location</FieldLabel>
        <Input
          {...form.register("location")}
          className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 border"
        />
        {form.formState.errors.location && (
          <FieldError>{form.formState.errors.location.message}</FieldError>
        )}
      </Field>

      <div className="mt-7 flex justify-end gap-4">
        <Button
          type="button"
          onClick={() => router.push(`/profile/${user._id}`)}
          className="btn-secondary min-h-14 w-full sm:w-fit px-4 text-white cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="primary-gradient min-h-14 w-full sm:w-fit px-4 text-white cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;