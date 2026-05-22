"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useTransition } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "../cards/TagCard";
import { createQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/route";
import { LoaderCircle } from "lucide-react";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const QuestionForm = () => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const { field: contentField } = useController({
    name: "content",
    control: form.control,
  });

  const { field: tagsField } = useController({
    name: "tags",
    control: form.control,
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    const newTags = tagsField.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    } else {
      form.clearErrors("tags");
    }
  };

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Question created successfully");

        if (result.data) {
          router.push(ROUTES.QUESTION(result.data._id));
        } else {
          toast.error(`Error ${result.status}`, {
            description: result.error?.message || "Something went wrong",
          });
        }
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="space-y-6"
      >
        {/* Title */}
        <Field>
          <FieldLabel className="paragraph-semibold text-dark400_light800">
            Question Title <span className="text-primary-500">*</span>
          </FieldLabel>
          <Input
            id="title"
            className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
            {...form.register("title")}
          />
          <FieldDescription className="body-regular text-light-500 mt-2.5">
            Be specific and imagine you&apos;re asking a question to another
            person.
          </FieldDescription>
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>

        {/* Content */}
        <Field>
          <FieldLabel className="paragraph-semibold text-dark400_light800">
            Detailed explanation of your problem{" "}
            <span className="text-primary-500">*</span>
          </FieldLabel>

          {/* Text Editor */}
          <Editor
            value={contentField.value}
            fieldChange={contentField.onChange}
            editorRef={editorRef}
          />

          <FieldDescription className="body-regular text-light-500 mt-2.5">
            Introduce the problem and expand on what you&apos;ve put in the
            title.
          </FieldDescription>
          <FieldError>{form.formState.errors.content?.message}</FieldError>
        </Field>

        {/* Tags */}
        <Field>
          <FieldLabel className="paragraph-semibold text-dark400_light800">
            Tags <span className="text-primary-500">*</span>
          </FieldLabel>
          <div>
            <Input
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
              placeholder="Add tags..."
              //   {...form.register("tags")}
              onKeyDown={(e) => handleInputKeyDown(e, tagsField)}
            />
            {/* Tags display here */}
            {tagsField.value.length > 0 && (
              <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                {tagsField?.value?.map((tag: string) => (
                  <TagCard
                    key={tag}
                    _id={tag}
                    name={tag}
                    compact
                    remove
                    isButton
                    handleRemove={() => handleTagRemove(tag)}
                  />
                ))}
              </div>
            )}
          </div>
          <FieldDescription className="body-regular text-light-500 mt-2.5">
            Add up to 3 tags to describe what your question is about. You need
            to press enter to add a tag.
          </FieldDescription>
          <FieldError>{form.formState.errors.tags?.message}</FieldError>
        </Field>

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient text-light-900 w-fit cursor-pointer py-5 max-sm:py-4"
          >
            { isPending ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>
                Ask Question
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default QuestionForm;
