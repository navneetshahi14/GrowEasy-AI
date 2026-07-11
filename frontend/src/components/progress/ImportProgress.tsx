"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Progress } from "@/components/ui/progress";

interface Props {
  open: boolean;
  progress: number;
  stage: string;
}

export default function ImportProgress({
  open,
  progress,
  stage,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>
            Importing CSV
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Progress value={progress} />

          <p className="text-center text-sm text-muted-foreground">
            {stage}
          </p>

        </div>

      </DialogContent>
    </Dialog>
  );
}