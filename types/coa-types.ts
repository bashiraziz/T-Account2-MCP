export type ChartOfAccountsType = {
  id?: string;
  userId?: string;
  accountCode: string;
  accountName: string;
  classification: string;
  type: string;
  detailType?: string | null;
};
