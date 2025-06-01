import { Step } from "react-joyride";

export function getTourSteps(isMobile: boolean, isSm: boolean): Step[] {
  return isMobile
    ? [
        {
          target: "body",
          content: "Let's take a quick tour of your accounting dashboard!",
          title: "Welcome to Your Dashboard!",
          placement: "center",
          disableBeacon: true,
          floaterProps: {
            styles: {
              floater: {
                width: "80%",
              },
            },
          },
        },
        {
          target: "#sidebar",
          content: "Manage your T-Accounts, Trial Balance, and more here.",
          title: "Sidebar Navigation",
          placement: "right",
        },
        {
          target: "#profile",
          content:
            "Use the dropdown to create a new session and manage your profile and chart of accounts.",
          title: "New Session, Profile & Chart of Accounts",
          placement: "bottom",
        },
        {
          target: isSm ? "#switch-session2" : "#switch-session",
          content: "Switch between different sessions easily.",
          title: "Switch Session",
          placement: "bottom",
        },
        {
          target: "#add-t-account",
          content: "Add a new TAccount in your session.",
          title: "Add New TAccount",
          placement: "bottom",
        },
        {
          target: "#select-account",
          content: "Select an Account from your Chart of accounts.",
          title: "Select an Account",
          placement: "bottom",
        },
        {
          target: "#record-transactions",
          content: "Record your transactions directly into the T-Account.",
          title: "Add Your Debits and Credits",
          placement: "bottom",
        },
        {
          target: "#save-changes",
          content: "save your latest changes to avoid losing your work.",
          title: "Don't Forget to Save",
          placement: "bottom",
        },
      ]
    : [
        {
          target: "body",
          content: "Let's take a quick tour of your accounting dashboard!",
          title: "Welcome to Your Dashboard!",
          placement: "center",
          disableBeacon: true,
        },
        {
          target: "#t-accounts",
          content: "Manage your ledger entries and account transactions here.",
          title: "T-Accounts",
          placement: "right",
        },
        {
          target: "#trial-balance",
          content: "View and verify your account balances in one place.",
          title: "Trial Balance",
          placement: "right",
        },
        {
          target: "#feedback",
          content: "Share your thoughts and suggestions with us.",
          title: "Feedback",
          placement: "right",
        },
        {
          target: "#profile",
          content:
            "Use the profile dropdown to manage your profile and chart of accounts",
          title: "Profile & Chart of Accounts",
          placement: "bottom",
        },
        {
          target: "#new-session",
          content: "Create a new session with a new set of accounts.",
          title: "New Session",
          placement: "bottom",
        },
        {
          target: "#switch-session",
          content: "Switch between different sessions easily.",
          title: "Switch Session",
          placement: "bottom",
        },
        {
          target: "#add-t-account",
          content: "Add a new TAccount in your session.",
          title: "Add New TAccount",
          placement: "bottom",
        },
        {
          target: "#select-account",
          content: "Select an Account from your Chart of accounts.",
          title: "Select an Account",
          placement: "bottom",
        },
        {
          target: "#record-transactions",
          content: "Record your transactions directly into the T-Account.",
          title: "Add Your Debits and Credits",
          placement: "bottom",
        },
        {
          target: "#save-changes",
          content: "save your latest changes to avoid losing your work.",
          title: "Don't Forget to Save",
          placement: "bottom",
        },
      ];
}
