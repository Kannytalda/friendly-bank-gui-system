
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

interface Account {
  acc_no: number;
  name: string;
  debit: number;
  credit: number;
  balance: number;
}

interface AccountsTableProps {
  accounts: Account[];
}

const AccountsTable: React.FC<AccountsTableProps> = ({ accounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Account>('acc_no');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleRecords, setVisibleRecords] = useState<number | null>(null);
  const [topRecords, setTopRecords] = useState<number | null>(null);
  const [bottomRecords, setBottomRecords] = useState<number | null>(null);

  const handleSort = (field: keyof Account) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    account.acc_no.toString().includes(searchTerm)
  );

  // Sort accounts
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply visible records limit
  let displayedAccounts = sortedAccounts;
  
  if (visibleRecords !== null && visibleRecords > 0) {
    displayedAccounts = displayedAccounts.slice(0, visibleRecords);
  }
  
  if (topRecords !== null && bottomRecords !== null && topRecords > 0 && bottomRecords > 0) {
    displayedAccounts = [
      ...displayedAccounts.slice(0, topRecords),
      ...displayedAccounts.slice(-bottomRecords)
    ];
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or account #"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                View Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => {
                setVisibleRecords(null);
                setTopRecords(null);
                setBottomRecords(null);
              }}>
                Show All Records
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setVisibleRecords(5);
                setTopRecords(null);
                setBottomRecords(null);
              }}>
                Show First 5 Records
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setVisibleRecords(null);
                setTopRecords(2);
                setBottomRecords(2);
              }}>
                Show 2 from Top & Bottom
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSortField('name');
              setSortDirection('asc');
            }}
          >
            Sort by Name (A-Z)
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSortField('balance');
              setSortDirection('desc');
            }}
          >
            Highest Balance
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            {displayedAccounts.length === 0
              ? "No accounts found"
              : `Showing ${displayedAccounts.length} of ${accounts.length} accounts`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('acc_no')}>
                <div className="flex items-center">
                  Acc #
                  {sortField === 'acc_no' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Name
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('debit')}>
                <div className="flex items-center justify-end">
                  Debit
                  {sortField === 'debit' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('credit')}>
                <div className="flex items-center justify-end">
                  Credit
                  {sortField === 'credit' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('balance')}>
                <div className="flex items-center justify-end">
                  Balance
                  {sortField === 'balance' && (
                    sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedAccounts.map((account) => (
              <TableRow key={account.acc_no}>
                <TableCell>{account.acc_no}</TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell className="text-right">${account.debit.toLocaleString()}</TableCell>
                <TableCell className="text-right">${account.credit.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">
                  ${account.balance.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccountsTable;
