import { PrimaryInput } from "@/components";
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
  type: "debit" | "credit";
  rows: Row[];
  addRow: () => void;
  // removeRow: (id: number) => void;
  updateRow: (
    type: "debit" | "credit",
    id: number,
    field: keyof Omit<Row, "id">,
    value: string
  ) => void;
  total: number;
  balance: number;
}

export const TransactionSection: FC<TransactionSectionProps> = ({
  type,
  rows,
  addRow,
  // removeRow,
  updateRow,
  total,
  balance,
}) => {
  const isDebit = type === "debit";
  const balanceClass = isDebit ? "text-green-500" : "text-red-500";

  return (
    <div
      className={`w-1/2 flex flex-col justify-between pt-2 pb-0 px-2 ${
        isDebit ? "border-r pl-0" : "border-l-0 pr-0"
      }`}
    >
      {/* <h2 className="font-bold mb-4">{isDebit ? "Debit" : "Credit"}</h2> */}
      <div>
        <div className="thin-scrollbar flex flex-col gap-2 min-h-[42px] max-h-[160px] overflow-auto p-2">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              {/* <button
                className="w-4 h-4 flex justify-center items-center rounded disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => removeRow(row.id)}
                disabled={rows.length === 1}
              >
                <FiMinus className="text-base" />
              </button> */}

              <PrimaryInput
                type="text"
                value={row.ref}
                placeholder="ref"
                className="flex-1 !py-1.5 !px-2 text-sm !rounded"
                onChange={(e) => updateRow(type, row.id, "ref", e.target.value)}
              />
              <PrimaryInput
                type="text"
                value={row.desc}
                placeholder="desc"
                className="flex-1 !py-1.5 !px-2 text-sm !rounded"
                onChange={(e) =>
                  updateRow(type, row.id, "desc", e.target.value)
                }
              />
              <PrimaryInput
                type="text"
                value={row.amount}
                placeholder={isDebit ? "dr" : "cr"}
                className="w-20 !py-1.5 !px-2 text-sm !rounded"
                inputClassName="text-right"
                onChange={(e) =>
                  updateRow(type, row.id, "amount", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <button
          className="w-6 h-6 flex justify-center items-center bg-primary text-white rounded mt-2 ml-2"
          onClick={addRow}
        >
          <FiPlus className="text-lg text-white" />
        </button>
      </div>
      <div className="mt-8 mx-2 border-b pb-1">
        <div className="flex justify-between items-center font-medium text-gray-500 py-2">
          Balance: <span>{balance.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center font-medium text-gray-500 py-2 border-y">
          Total: <span className="text-black">{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
