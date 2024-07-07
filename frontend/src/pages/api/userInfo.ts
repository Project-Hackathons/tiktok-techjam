export interface UserType {
  balance: number;
  display_name: string;
  email: string;
  rewards: Reward[];
  transactions: Transaction[];
  uid: string;
  username: string;
}

interface Transaction {
  fee: number;
  from: Account;
  tid: number;
  to: Account;
}

interface Account {
  balance_after: number;
  balance_before: number;
  uid: number;
}

export interface Reward {
  amount: number;
  claimed: number;
  message: string;
  rid: number;
}

export const userInfo = async (): Promise<UserType> => {
  try {
    const response = await fetch("http://152.42.182.247:5000/user/3");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data: UserType = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};
