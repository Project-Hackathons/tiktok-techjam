import axios from "axios";
export interface UserType {
  balance: number;
  display_name: string;
  email: string;
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

const CLIENT_KEY = process.env.NEXT_PUBLIC_TT_CLIENT_KEY ?? "";
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TT_CLIENT_SECRET ?? "";

export const userInfo = async (accessCode: string): Promise<UserType> => {
  try {
    // const response = await fetch("http://152.42.182.247:5000/user/1");
    // if (!response.ok) {
    //   throw new Error("Network response was not ok " + response.statusText);
    // }
    // const data: UserType = await response.json();
    const data = new URLSearchParams();
    data.append("client_key", "sbawtiri70hj56ck90");
    data.append("client_secret", "uYn0wz2G37vOL07AeGlTgTEn7hqLlRn6");
    data.append(
      "code",
      accessCode
    );
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", "https://tiktok-techjam-vercel.vercel.app");

    // Make the axios POST request
    const response = await axios({
      method: "post",
      url: "https://open.tiktokapis.com/v2/oauth/token/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      data: data.toString(), // Convert URLSearchParams to a string
    })
    return response.data
    
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};
