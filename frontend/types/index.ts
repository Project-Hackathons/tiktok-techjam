interface User {
  uid: string;
  balance: number;
  display_name: string;
  email: string;
  username: string;
  transactions: Transaction[];
}

interface Transaction {
  tid: number;
  fee: number;
  from: TransactionDetail;
  to: TransactionDetail;
  type: string
  timestamp: number
}

interface TransactionDetail {
  uid: number;
  balance_before: number;
  balance_after: number;
}

export type { User, Transaction, TransactionDetail };
