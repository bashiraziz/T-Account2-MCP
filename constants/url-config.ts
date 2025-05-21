import { GET } from "@/app/api/auth/check-username/route";

export const API_URLS = {
  AUTH: {
    SEND_VERIFICATION_CODE: "/api/auth/send-verification-email",
    VERIFY_CODE: "/api/auth/verify-code",
    SIGNUP: "/api/auth/sign-up",
    CHECK_USERNAME: "/api/auth/check-username",
    FORGOT_PASSWORD: {
      SEND_VERIFICATION_CODE:
        "/api/auth/forgot-password/send-verification-code",
      VERIFY_CODE: "/api/auth/forgot-password/verify-code",
      RESET_PASSWORD: "/api/auth/forgot-password/reset-password",
    },
  },
  USER: {
    GET_USER: "/api/user/get-user",
    UPLOAD_PROFILE_IMAGE: "/api/user/upload-profile-image",
    DELETE_IMAGE: "/api/user/delete-profile-image",
    UPDATE_USER: "/api/user/update-user",
    CHANGE_PASSWORD: "/api/user/change-password",
    DELETE_ACCOUNT: "/api/user/delete-account",
  },
  CHART_OF_ACCOUNTS: {
    GET_CHART_OF_ACCOUNTS: "/api/chart-of-accounts/get-chart-of-accounts",
    ADD_CHART_OF_ACCOUNT: "/api/chart-of-accounts/add-chart-of-account",
    EDIT_CHART_OF_ACCOUNT: "/api/chart-of-accounts/update-chart-of-account",
    DELETE_CHART_OF_ACCOUNT: "/api/chart-of-accounts/delete-chart-of-account",
    UPLOAD_CHART_OF_ACCOUNTS: "/api/chart-of-accounts/update-chart-of-accounts",
    DELETE_ALL_CHART_OF_ACCOUNTS:
      "/api/chart-of-accounts/delete-all-chart-of-accounts",
  },
  SESSIONS: {
    SAVE_SESSION: "/api/sessions/save-session",
    GET_ALL_SESSIONS: "/api/sessions/get-all-sessions",
    GET_SESSION_DETAILS: "/api/sessions/get-session-details",
    DELETE_SESSION: "/api/sessions/delete-session",
    DELETE_TACCOUNT: "/api/sessions/delete-taccount",
  },
  TRIAL_BALANCE: {
    GET_SESSION_TRIAL_BALANCE: "/api/trial-balance/get-session-trial-balance",
  },
  FEEDBACK: {
    SEND_FEEDBACK: "/api/feedback/send-feedback",
  },
};
