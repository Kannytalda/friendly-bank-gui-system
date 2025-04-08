
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Banknote, FileText, CheckCircle } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            About Bank Management System
          </DialogTitle>
          <DialogDescription>
            A modern interface for bank management operations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm">
            The Bank Management System provides an interface for cashiers to manage bank accounts, 
            process transactions, and perform various banking operations.
          </p>
          
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              System Features
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                View all account details
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Add new account holders
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Remove closed accounts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Process deposits and withdrawals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Check account balances
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                View and sort records
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Find maximum balance accounts
              </li>
            </ul>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 | Developed with React + Tailwind CSS
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
