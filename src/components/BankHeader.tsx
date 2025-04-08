
import React from 'react';
import { Banknote } from 'lucide-react';

const BankHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <Banknote className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Bank Management System</h1>
      </div>
      <div className="text-sm">
        Welcome, Cashier
      </div>
    </header>
  );
};

export default BankHeader;
