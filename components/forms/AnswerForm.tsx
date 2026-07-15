"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { useRef, useState, useTransition } from "react";
import { AnswerSchema } from "@/lib/validations";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const session = useSession();

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });

      console.log("Server action result:", result);

      if (result.success) {
        form.reset();

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }

        toast.success("Success", {
          description: "Your answer has been posted successfully",
        });
      } else {
        toast.error("Error", {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.error("Please log in", {
        description: "You need to be logged in to use this feature",
      });
    }

    setIsAISubmitting(true);

    const userAnswer = editorRef.current?.getMarkdown();

    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent,
        userAnswer
      );

      if (!success) {
        return toast.error("Error", { description: error?.message });
      }

      if (!data) {
        return toast.error("Error", {
          description: "No response generated. Please try again.",
        });
      }

      const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }

      toast.success("Success", {
        description: "AI generated answer has been generated",
      });
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "There was a problem with your request.",
      });
    } finally {
      setIsAISubmitting(false);
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    form.handleSubmit(handleSubmit)(e);
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500 cursor-pointer gap-1.5 rounded-md border px-4 py-2.5 shadow-none"
          disabled={isAISubmitting}
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <LoaderCircle className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src={"/icons/stars.svg"}
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <form
        onSubmit={onFormSubmit}
        className="mt-6 flex w-full flex-col gap-10"
      >
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit cursor-pointer py-5 text-white"
          >
            {isAnswering ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Answer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;
