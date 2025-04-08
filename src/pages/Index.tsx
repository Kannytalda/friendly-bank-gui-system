
import React, { useState } from 'react';
import BankHeader from '@/components/BankHeader';
import AccountsTable from '@/components/AccountsTable';
import AccountForm from '@/components/AccountForm';
import TransactionForm from '@/components/TransactionForm';
import BalanceEnquiry from '@/components/BalanceEnquiry';
import AboutModal from '@/components/AboutModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Users, Plus, Trash, Search, ArrowDown, ArrowUp } from 'lucide-react';

const Index = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Mock data - in a real app this would come from API calls
  const [accounts, setAccounts] = useState([
    { acc_no: 1001, name: "John Smith", debit: 500, credit: 2500, balance: 2000 },
    { acc_no: 1002, name: "Emma Johnson", debit: 300, credit: 4300, balance: 4000 },
    { acc_no: 1003, name: "Michael Brown", debit: 200, credit: 3200, balance: 3000 },
    { acc_no: 1004, name: "Sophia Williams", debit: 100, credit: 1100, balance: 1000 },
  ]);

  const addAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  const removeAccount = (accNo) => {
    setAccounts(accounts.filter(account => account.acc_no !== accNo));
  };

  const updateBalance = (accNo, amount, isDeposit) => {
    setAccounts(accounts.map(account => {
      if (account.acc_no === accNo) {
        if (isDeposit) {
          return { 
            ...account, 
            credit: account.credit + amount,
            balance: account.balance + amount
          };
        } else {
          return { 
            ...account, 
            debit: account.debit + amount,
            balance: account.balance - amount
          };
        }
      }
      return account;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BankHeader />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bank-card col-span-1">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <span className="text-3xl font-bold">{accounts.length}</span>
              <span className="text-sm">Total Accounts</span>
            </CardContent>
          </Card>
          
          <Card className="bank-card col-span-1">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <span className="text-3xl font-bold">
                ${accounts.reduce((sum, account) => sum + account.balance, 0).toLocaleString()}
              </span>
              <span className="text-sm">Total Balance</span>
            </CardContent>
          </Card>
          
          <Card className="bank-card col-span-1">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <span className="text-3xl font-bold">
                ${accounts.reduce((max, account) => Math.max(max, account.balance), 0).toLocaleString()}
              </span>
              <span className="text-sm">Max Balance</span>
            </CardContent>
          </Card>
          
          <Card className="bank-card col-span-1">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <span className="text-3xl font-bold">
                ${Math.round(accounts.reduce((sum, account) => sum + account.balance, 0) / accounts.length).toLocaleString()}
              </span>
              <span className="text-sm">Average Balance</span>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="add-account" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">New Account</span>
            </TabsTrigger>
            <TabsTrigger value="remove-account" className="flex items-center gap-2">
              <Trash className="h-4 w-4" />
              <span className="hidden md:inline">Remove Account</span>
            </TabsTrigger>
            <TabsTrigger value="enquiry" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Balance Enquiry</span>
            </TabsTrigger>
            <TabsTrigger value="transaction" className="flex items-center gap-2">
              <div className="flex flex-col">
                <ArrowDown className="h-3 w-3" />
                <ArrowUp className="h-3 w-3" />
              </div>
              <span className="hidden md:inline">Transactions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="mt-6">
            <AccountsTable accounts={accounts} />
          </TabsContent>
          
          <TabsContent value="add-account" className="mt-6">
            <AccountForm accounts={accounts} onAddAccount={addAccount} />
          </TabsContent>
          
          <TabsContent value="remove-account" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Remove Account</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-4">Select an account to remove:</p>
                    <div className="space-y-2">
                      {accounts.map((account) => (
                        <div key={account.acc_no} className="flex justify-between items-center p-3 border rounded hover:bg-muted">
                          <div>
                            <div className="font-medium">{account.name}</div>
                            <div className="text-sm text-muted-foreground">Account #{account.acc_no}</div>
                          </div>
                          <button
                            onClick={() => removeAccount(account.acc_no)}
                            className="bg-destructive text-destructive-foreground px-3 py-1 rounded hover:bg-destructive/90 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Important Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Removing an account is permanent and cannot be undone. Please ensure that the account has been closed properly before removing it from the system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enquiry" className="mt-6">
            <BalanceEnquiry accounts={accounts} />
          </TabsContent>
          
          <TabsContent value="transaction" className="mt-6">
            <TransactionForm accounts={accounts} onTransaction={updateBalance} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted py-4 px-6 text-center">
        <button 
          className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setIsAboutOpen(true)}
        >
          <Info className="h-4 w-4" />
          About this project
        </button>
      </footer>
      
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default Index;
