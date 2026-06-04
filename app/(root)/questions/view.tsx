"use client";

import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({ questionId }: { questionId: string }) => {
  useEffect(() => {
    const incrementView = async () => {
        const result = await incrementViews({ questionId });

        if (!result.success) {
            toast.error("Error", {
                description: result.error?.message
            });
        }

        toast.success("Success", {
            description: "Views incremented"
        });
    };

    incrementView();
  }, [questionId]);

  return null;
};

export default View;
