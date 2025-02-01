import { FC } from "react";

const thCellClasses =
  "text-start text-base font-medium bg-[#f3f2f7] border-b border-gray-200 py-4 px-4";
const tdCellClasses =
  "text-start text-base font-normal border-b border-gray-200 py-5 px-4";
const tFootClasses =
  "text-start text-base font-medium bg-[#f3f2f7] border-t border-gray-200 py-4 px-4";

export const TrialBalanceTable: FC = () => {
  return (
    <div className="pb-4">
      <div className="flex justify-between items-end gap-6 py-6 border-b">
        <div>
          <h1 className="text-2xl font-medium mb-1">Trial balance</h1>
          <p className="text-sm font-normal">
            Trial Balance for Session Overview{" "}
            <span className="text-white text-sm font-normal bg-secondary py-0.5 px-1 rounded">
              REF-01-01-25
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <h6 className="text-base font-medium">Date:</h6>
          <span className="text-base font-normal">01-27-2025</span>
        </div>
      </div>
      <div className="py-8">
        <table className="w-full table-auto text-start border-collapse">
          <thead>
            <tr>
              <th className={`rounded-tl-md w-[180px] ${thCellClasses}`}>
                Account No
              </th>
              <th className={thCellClasses}>Account Name</th>
              <th className={thCellClasses}>Debits</th>
              <th className={`rounded-tr-md ${thCellClasses}`}>Credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`w-[180px] ${tdCellClasses}`}>001</td>
              <td className={tdCellClasses}>Accounts Receivable</td>
              <td className={tdCellClasses}>0.00</td>
              <td className={tdCellClasses}>0.00</td>
            </tr>
            <tr>
              <td className={`w-[180px] ${tdCellClasses}`}>002</td>
              <td className={tdCellClasses}>Inventory</td>
              <td className={tdCellClasses}>0.00</td>
              <td className={tdCellClasses}>0.00</td>
            </tr>
            <tr>
              <td className={`w-[180px] ${tdCellClasses}`}>002</td>
              <td className={tdCellClasses}>Inventory</td>
              <td className={tdCellClasses}>0.00</td>
              <td className={tdCellClasses}>0.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className={`rounded-bl-md w-[180px] ${tFootClasses}`}>
                Total
              </td>
              <td className={tFootClasses}></td>
              <td className={tFootClasses}>0.00</td>
              <td className={`rounded-br-md ${tFootClasses}`}>0.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
