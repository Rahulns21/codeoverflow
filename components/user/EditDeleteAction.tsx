"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/questions/${itemId}/edit`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ questionId: itemId });

      toast.success("Question deleted", {
        description:
          "Your question and it's answers has been deleted successfully.",
      });
    } else if (type === "Answer") {
      await deleteAnswer({ answerId: itemId });

      toast.success("Answer deleted", {
        description: "Your answer has been deleted successfully.",
      });
    }
  };

  return (
    <div
      className={`flex items-center justify-end gap-3 max-sm:w-full ${type === "Answer" && "justify-center gap-0"}`}
    >
      {type === "Question" && (
        <Image
          src={"/icons/edit.svg"}
          alt="edit"
          width={16}
          height={16}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Image src={"/icons/trash.svg"} alt="trash" width={16} height={16} />
        </AlertDialogTrigger>
        <AlertDialogContent className="background-light800_dark300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {type === "Question"
                ? "This action cannot be undone. This will permanently delete this question and all of its answers from our servers."
                : "This action cannot be undone. This will permanently delete this answer from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="background-light800_dark300">
            <AlertDialogCancel className="btn cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-primary-500! text-light-800! cursor-pointer"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
