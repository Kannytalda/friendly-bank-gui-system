
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Account {
  acc_no: number;
  name: string;
  debit: number;
  credit: number;
  balance: number;
}

interface AccountFormProps {
  accounts: Account[];
  onAddAccount: (account: Account) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ accounts, onAddAccount }) => {
  const { toast } = useToast();
  const [accNo, setAccNo] = useState('');
  const [name, setName] = useState('');
  const [debit, setDebit] = useState('');
  const [credit, setCredit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!accNo || !name || !debit || !credit) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const accNoInt = parseInt(accNo);
    const debitInt = parseInt(debit);
    const creditInt = parseInt(credit);

    // Check if account number already exists
    if (accounts.some(account => account.acc_no === accNoInt)) {
      toast({
        title: "Error",
        description: "Account number already exists",
        variant: "destructive",
      });
      return;
    }

    // Calculate balance
    const balance = creditInt - debitInt;

    // Create new account
    const newAccount: Account = {
      acc_no: accNoInt,
      name,
      debit: debitInt,
      credit: creditInt,
      balance,
    };

    // Add account
    onAddAccount(newAccount);
    
    // Reset form
    setAccNo('');
    setName('');
    setDebit('');
    setCredit('');
    
    // Show success toast
    toast({
      title: "Success",
      description: "Account has been created successfully",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acc-no">Account Number</Label>
                <Input
                  id="acc-no"
                  type="number"
                  placeholder="e.g., 1001"
                  value={accNo}
                  onChange={(e) => setAccNo(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Account Holder Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="debit">Initial Debit Amount</Label>
                <Input
                  id="debit"
                  type="number"
                  placeholder="e.g., 500"
                  value={debit}
                  onChange={(e) => setDebit(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credit">Initial Credit Amount</Label>
                <Input
                  id="credit"
                  type="number"
                  placeholder="e.g., 2500"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                />
              </div>
              
              {credit && debit && (
                <div className="py-2">
                  <p className="text-sm text-muted-foreground">
                    Initial Balance: ${parseInt(credit) - parseInt(debit)}
                  </p>
                </div>
              )}
              
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </div>
          
          <div className="bg-accent rounded-lg p-6">
            <h3 className="font-medium mb-4">Guidelines for New Accounts</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                <span>Each account must have a unique account number</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                <span>Enter the full name of the account holder</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                <span>Initial debit is the amount withdrawn from account at opening</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                <span>Initial credit is the amount deposited to account at opening</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">5</span>
                <span>Initial balance will be calculated automatically (Credit - Debit)</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountForm;
