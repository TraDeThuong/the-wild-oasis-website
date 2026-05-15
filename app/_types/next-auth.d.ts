import "next-auth";

declare module "next-auth" {
  interface User {
    guestID: number;
  }

  interface Session {
    user: {
      guestID: number;
    } & DefaultSession["user"];
  }
}