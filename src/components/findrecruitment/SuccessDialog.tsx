"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  onClose: () => void;
}

export default function SuccessDialog({ onClose }: SuccessDialogProps) {
  return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center mt-4">Application Submitted!</DialogTitle>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button type="button" onClick={onClose} className="bg-black hover:bg-gray-800">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}