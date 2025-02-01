import { FC } from "react";
import { TAccounts } from "./t-accounts";

export const Home: FC = () => {
  // this page will switch between the sessions below, we have one Session displayed to share the UI right now 
  return (
    <div>
      <TAccounts />
    </div>
  );
};
