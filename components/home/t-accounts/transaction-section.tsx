import { PrimaryInput } from "@/components";
import { Entry, EntryType } from "@/types";
import { FC } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export type Row = {
  id: number;
  ref: string;
  desc: string;
  amount: string;
  type: "dr" | "cr";
};

interface TransactionSectionProps {
  type: EntryType;
  rows: Entry[];
  addRow: () => void;
  updateRow: (
    type: EntryType,
    id: string,
    field: keyof Omit<Entry, "id" | "entryType" | "tAccountId">,
    value: string | number
  ) => void;
  total: number;
  balance: number;
}

export const TransactionSection: FC<TransactionSectionProps> = ({
  type,
  rows,
  addRow,
  updateRow,
  // removeRow,
  total,
  balance,
}) => {
  const isDebit = type === "DEBIT";

  const formatNumber = (num: number | string) => {
    if (!num) return "0.00";
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(
      Number(num)
    );
  };

  return (
    <div
      className={`w-1/2 flex flex-col justify-between pt-2 pb-0 px-2 ${
        isDebit ? "border-r pl-0" : "border-l-0 pr-0"
      }`}
    >
      {/* <h2 className="font-bold mb-4">{isDebit ? "Debit" : "Credit"}</h2> */}
      <div>
        {rows.length > 0 && (
          <div className="thin-scrollbar flex flex-col gap-2 min-h-[42px] max-h-[160px] overflow-auto p-2">
            {rows.map((row) => (
              <div
                key={row.id}
                className="flex max-sm:flex-wrap items-center gap-2"
              >
                {/* <button
                className="w-4 h-4 flex justify-center items-center rounded disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => removeRow(row.id)}
                disabled={rows.length === 1}
              >
                <FiMinus className="text-base" />
              </button> */}

                <PrimaryInput
                  type="text"
                  value={row.referenceNumber}
                  placeholder="ref"
                  className="max-sm:w-[calc(50%-4px)] sm:flex-1 !py-1.5 !px-2 text-sm !rounded"
                  onChange={(e) =>
                    updateRow(type, row.id, "referenceNumber", e.target.value)
                  }
                />
                <PrimaryInput
                  type="text"
                  value={row.description}
                  placeholder="desc"
                  className="max-sm:w-[calc(50%-4px)] sm:flex-1 !py-1.5 !px-2 text-sm !rounded"
                  onChange={(e) =>
                    updateRow(type, row.id, "description", e.target.value)
                  }
                />
                <PrimaryInput
                  type="text"
                  value={
                    row.amount == 0
                      ? ""
                      : Number(row.amount).toLocaleString("en-US")
                  }
                  placeholder={isDebit ? "dr" : "cr"}
                  className="w-full sm:w-20 !py-1.5 !px-2 text-sm !rounded"
                  inputClassName="text-right"
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    const numericValue = parseFloat(rawValue);
                    updateRow(
                      type,
                      row.id,
                      "amount",
                      isNaN(numericValue) ? "" : numericValue
                    );
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <button
          className="w-6 h-6 flex justify-center items-center bg-primary text-white rounded mt-2 ml-2"
          onClick={addRow}
        >
          <FiPlus className="text-lg text-white" />
        </button>
      </div>
      <div className="mt-8 mx-2 border-b pb-1">
        <div className="flex justify-between items-center font-medium text-gray-500 py-2">
          Balance: <span>{formatNumber(balance)}</span>
        </div>
        <div className="flex justify-between items-center font-medium text-gray-500 py-2 border-y">
          Total: <span className="text-black">{formatNumber(total)}</span>
        </div>
      </div>
    </div>
  );
};
