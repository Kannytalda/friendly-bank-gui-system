
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';

interface Account {
  acc_no: number;
  name: string;
  debit: number;
  credit: number;
  balance: number;
}

interface TransactionFormProps {
  accounts: Account[];
  onTransaction: (accNo: number, amount: number, isDeposit: boolean) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ accounts, onTransaction }) => {
  const { toast } = useToast();
  const [accNo, setAccNo] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAccNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccNo(value);
    setSelectedAccount(null);
    setShowConfirmation(false);
    
    // Find account
    const account = accounts.find(acc => acc.acc_no === parseInt(value));
    if (account) {
      setSelectedAccount(account);
    }
  };

  const handleTransaction = () => {
    if (!selectedAccount || !amount) {
      toast({
        title: "Error",
        description: "Please select a valid account and enter an amount",
        variant: "destructive",
      });
      return;
    }

    const amountNum = parseInt(amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    // Check if withdrawal is possible
    if (transactionType === 'withdraw' && amountNum > selectedAccount.balance) {
      toast({
        title: "Error",
        description: "Insufficient balance for withdrawal",
        variant: "destructive",
      });
      return;
    }

    // Process transaction
    onTransaction(selectedAccount.acc_no, amountNum, transactionType === 'deposit');
    
    setShowConfirmation(true);
    
    // Reset form after delay
    setTimeout(() => {
      setAccNo('');
      setAmount('');
      setSelectedAccount(null);
      setShowConfirmation(false);
      
      toast({
        title: "Success",
        description: `${transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} of $${amountNum} has been processed successfully`,
      });
    }, 2000);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Process Transaction</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {!showConfirmation ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="transaction-type">Transaction Type</Label>
                  <RadioGroup 
                    id="transaction-type" 
                    value={transactionType}
                    onValueChange={setTransactionType}
                    className="flex flex-col md:flex-row gap-2 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deposit" id="deposit" />
                      <Label htmlFor="deposit" className="flex items-center cursor-pointer">
                        <ArrowDown className="h-4 w-4 mr-2 text-green-500" />
                        Deposit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="withdraw" id="withdraw" />
                      <Label htmlFor="withdraw" className="flex items-center cursor-pointer">
                        <ArrowUp className="h-4 w-4 mr-2 text-red-500" />
                        Withdraw
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="acc-no">Account Number</Label>
                  <Input
                    id="acc-no"
                    placeholder="Enter account number"
                    value={accNo}
                    onChange={handleAccNoChange}
                  />
                </div>
                
                {selectedAccount && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-medium">{selectedAccount.name}</p>
                    <p className="text-sm text-muted-foreground">Current Balance: ${selectedAccount.balance.toLocaleString()}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleTransaction} 
                  className="w-full"
                  disabled={!selectedAccount || !amount}
                >
                  Process {transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Transaction Successful</h3>
                <p className="text-center text-muted-foreground mb-4">
                  {transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} of ${parseInt(amount).toLocaleString()} has been processed.
                </p>
                <p className="font-medium">
                  New Balance: ${(selectedAccount!.balance + (transactionType === 'deposit' ? parseInt(amount) : -parseInt(amount))).toLocaleString()}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-accent rounded-lg p-6">
            <h3 className="font-medium mb-4">Transaction Guidelines</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <ArrowDown className="h-4 w-4 mr-2 text-green-500" />
                  Deposits
                </h4>
                <ul className="space-y-1 text-sm pl-6 list-disc">
                  <li>Enter the account number correctly</li>
                  <li>Verify account holder's name</li>
                  <li>Enter the deposit amount</li>
                  <li>Confirm the transaction details</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <ArrowUp className="h-4 w-4 mr-2 text-red-500" />
                  Withdrawals
                </h4>
                <ul className="space-y-1 text-sm pl-6 list-disc">
                  <li>Enter the account number correctly</li>
                  <li>Verify account holder's name</li>
                  <li>Check available balance</li>
                  <li>Enter withdrawal amount (must be less than balance)</li>
                  <li>Confirm the transaction details</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="text-xs text-muted-foreground">
                  Note: All transactions are logged for security purposes. 
                  If you notice any discrepancies, please report to the 
                  system administrator immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
