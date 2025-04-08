
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

interface Account {
  acc_no: number;
  name: string;
  debit: number;
  credit: number;
  balance: number;
}

interface BalanceEnquiryProps {
  accounts: Account[];
}

const BalanceEnquiry: React.FC<BalanceEnquiryProps> = ({ accounts }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchBy, setSearchBy] = useState('accNo');
  const [searchResults, setSearchResults] = useState<Account[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = () => {
    let results: Account[] = [];
    
    if (searchBy === 'accNo') {
      const accNo = parseInt(searchInput);
      if (!isNaN(accNo)) {
        results = accounts.filter(account => account.acc_no === accNo);
      }
    } else {
      results = accounts.filter(account => 
        account.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    
    setSearchResults(results);
    setIsSearched(true);
  };

  const handleMaxBalance = () => {
    if (accounts.length === 0) {
      setSearchResults([]);
      return;
    }
    
    const maxBalance = Math.max(...accounts.map(acc => acc.balance));
    const accountsWithMaxBalance = accounts.filter(acc => acc.balance === maxBalance);
    
    setSearchResults(accountsWithMaxBalance);
    setIsSearched(true);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Balance Enquiry</h2>
        
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="search">Search by Account</TabsTrigger>
            <TabsTrigger value="max">Max Balance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <Label htmlFor="search-by">Search By</Label>
                  <select
                    id="search-by"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                  >
                    <option value="accNo">Account Number</option>
                    <option value="name">Account Holder Name</option>
                  </select>
                </div>
                
                <div className="w-full md:w-2/3">
                  <Label htmlFor="search-input">
                    {searchBy === 'accNo' ? 'Enter Account Number' : 'Enter Account Holder Name'}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="search-input"
                      placeholder={searchBy === 'accNo' ? 'e.g., 1001' : 'e.g., John Smith'}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button onClick={handleSearch}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                {isSearched && (
                  searchResults.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Found {searchResults.length} {searchResults.length === 1 ? 'account' : 'accounts'}
                      </p>
                      
                      {searchResults.map(account => (
                        <div key={account.acc_no} className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h3 className="font-medium text-lg">{account.name}</h3>
                              <p className="text-sm text-muted-foreground">Account #{account.acc_no}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Current Balance</div>
                              <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-muted rounded p-3">
                              <div className="text-sm text-muted-foreground">Total Debits</div>
                              <div className="font-medium">${account.debit.toLocaleString()}</div>
                            </div>
                            <div className="bg-muted rounded p-3">
                              <div className="text-sm text-muted-foreground">Total Credits</div>
                              <div className="font-medium">${account.credit.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No accounts found matching your search.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="max" className="space-y-4">
            <div className="space-y-4">
              <div className="text-center">
                <p className="mb-4">Find accounts with the highest balance in the system.</p>
                <Button onClick={handleMaxBalance}>Show Maximum Balance Accounts</Button>
              </div>
              
              <div className="mt-6">
                {isSearched && (
                  searchResults.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Found {searchResults.length} {searchResults.length === 1 ? 'account' : 'accounts'} with maximum balance
                      </p>
                      
                      {searchResults.map(account => (
                        <div key={account.acc_no} className="p-4 border rounded-lg bg-accent">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h3 className="font-medium text-lg">{account.name}</h3>
                              <p className="text-sm text-muted-foreground">Account #{account.acc_no}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Maximum Balance</div>
                              <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No accounts found.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BalanceEnquiry;
