'use client';

import { AskQuestion } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';


const QuestionForm = () => {
    const form = useForm({
        resolver: zodResolver(AskQuestion),
        defaultValues: {
            title: "",
            content: "",
            tags: [],
        },
    });

    const handleCreateQuestion = () => {};

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleCreateQuestion)} className="space-y-6">

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
          <FieldDescription className="body-regular mt-2.5 text-light-500">
            Be specific and imagine you&apos;re asking a question to another person.
          </FieldDescription>
          <FieldError>{form.formState.errors.title?.message}</FieldError>
        </Field>

        {/* Content */}
        <Field>
          <FieldLabel className="paragraph-semibold text-dark400_light800">
            Detailed explanation of your problem{" "}
            <span className="text-primary-500">*</span>
          </FieldLabel>

          {/* Your editor goes here */}


          <FieldDescription className="body-regular mt-2.5 text-light-500">
            Introduce the problem and expand on what you&apos;ve put in the title.
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
              {...form.register("tags")}
            />
            {/* Tags display here */}
          </div>
          <FieldDescription className="body-regular mt-2.5 text-light-500">
            Add up to 3 tags to describe what your question is about. You need
            to press enter to add a tag.
          </FieldDescription>
          <FieldError>{form.formState.errors.tags?.message}</FieldError>
        </Field>

        <div className='mt-16 flex justify-end'>
            <Button type='submit' className='primary-gradient text-light-900 w-fit py-5 cursor-pointer max-sm:py-4'>
             Ask Question
            </Button>
        </div>

      </form>
    </FormProvider>
  )
}

export default QuestionForm;