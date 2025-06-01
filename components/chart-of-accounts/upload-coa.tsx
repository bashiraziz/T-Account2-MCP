import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LoadingSpinner, PrimaryBtn } from "../common";
import { ChartOfAccountsType } from "@/types";
import { LuFile, LuUpload, LuX } from "react-icons/lu";

export const UploadCoa = ({
  onUpload,
  isLoading,
}: {
  onUpload: (file: File, onSuccess: () => void) => void;
  isLoading: boolean;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Required fields to check in each record
  const requiredFields = ["Account Code", "Account Name"];
  // Detail Type is optional

  const validateFileContent = (file: File) => {
    setIsValidating(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        if (file.name.endsWith(".json")) {
          // Validate JSON structure
          const jsonData = JSON.parse(event.target?.result as string);

          if (!Array.isArray(jsonData)) {
            setError("Error: JSON file must contain an array of objects");
            setFiles([]);
            setIsValidating(false);
            return;
          }

          // Check if every object has the required fields
          const missingFields = jsonData.some((item, index) => {
            const missing = requiredFields.filter(
              (field) =>
                !item[field] && item[field] !== 0 && item[field] !== false
            );

            if (missing.length > 0) {
              setError(
                `Error: Object at index ${index} is missing required fields: ${missing.join(
                  ", "
                )}`
              );
              return true;
            }
            return false;
          });

          if (!missingFields) {
            setError(null);
            setFiles([file]);
          } else {
            setFiles([]);
          }
        } else if (file.name.endsWith(".csv")) {
          // Validate CSV structure
          const csvData = (event.target?.result as string).split("\n");
          const headers = csvData[0].split(",").map((h) => h.trim());

          // Check if headers contain all required fields
          const missingHeaders = requiredFields.filter(
            (field) => !headers.includes(field)
          );
          if (missingHeaders.length > 0) {
            setError(
              `Error: CSV is missing required headers: ${missingHeaders.join(
                ", "
              )}`
            );
            setFiles([]);
            setIsValidating(false);
            return;
          }

          // Check each row for required fields
          let hasError = false;
          for (let i = 1; i < csvData.length; i++) {
            if (!csvData[i].trim()) continue; // Skip empty rows

            const rowValues = csvData[i].split(",");
            if (rowValues.length !== headers.length) {
              setError(`Error: Row ${i} has incorrect number of values`);
              hasError = true;
              break;
            }

            const rowData: { [key: string]: string | undefined } = {};
            headers.forEach((header, index) => {
              rowData[header] = rowValues[index]?.trim();
            });

            const missingFields = requiredFields.filter(
              (field) =>
                !rowData[field] &&
                rowData[field] !== "0" &&
                rowData[field] !== "false"
            );

            if (missingFields.length > 0) {
              setError(
                `Error: Row ${i} is missing required values: ${missingFields.join(
                  ", "
                )}`
              );
              hasError = true;
              break;
            }
          }

          if (!hasError) {
            setError(null);
            setFiles([file]);
          } else {
            setFiles([]);
          }
        }
      } catch (e) {
        setError(`Error: Failed to parse file - ${(e as Error).message}`);
        setFiles([]);
      }

      setIsValidating(false);
    };

    reader.onerror = () => {
      setError("Error: Failed to read file");
      setFiles([]);
      setIsValidating(false);
    };

    if (file.name.endsWith(".json")) {
      reader.readAsText(file);
    } else if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      validateFileContent(acceptedFiles[0]);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: any) => {
    setError("Error: Only CSV and JSON files are allowed");
    setFiles([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    accept: {
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
  });

  const removeFile = (fileName: string) => {
    setFiles(files.filter((f) => f.name !== fileName));
    setError(null);
  };

  const resetFiles = () => setFiles([]);

  return (
    <div>
      {files.length === 0 && (
        <div className="bg-secondaryLight border border-secondary max-w-[680px] w-full p-3 text-center rounded-md mb-4">
          <p className="text-sm font-normal">
            Each entry must contain the following required fields:{" "}
            <b className="font-medium">Account Code</b> and{" "}
            <b className="font-medium">Account Name</b>. Additionally, up to
            three optional fields can be provided.
          </p>
        </div>
      )}
      <label className="block text-base mb-1">
        Upload your Chart of Accounts
      </label>
      <div className="max-w-[680px] w-full flex flex-wrap gap-3">
        <div
          {...getRootProps()}
          className={`w-full border border-lightGray p-5 sm:p-7 rounded-lg text-center cursor-pointer ${
            isDragActive
              ? "border-primary bg-primaryLight"
              : error
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <span className="flex justify-center items-center gap-2 text-primary text-base font-medium leading-5">
            <LuUpload />
            Upload CSV or JSON file
          </span>

          {error && <p className="text-red-500 font-medium mt-3">{error}</p>}

          {isValidating && (
            <p className="text-blue-500 font-medium mt-3">
              Validating file content...
            </p>
          )}

          {files.length > 0 ? (
            <ul className="mt-7 text-base font-normal">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative w-fit mx-auto flex items-center gap-2"
                >
                  <LuFile />
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.name);
                    }}
                    className="absolute -top-[12px] -right-[12px] w-4 h-4 flex justify-center items-center bg-lightGray rounded-full cursor-pointer"
                  >
                    <LuX />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray text-base font-normal leading-6 mt-3">
              {isDragActive
                ? "Drop the file here"
                : "or drag and drop files here"}
            </p>
          )}
        </div>
        <PrimaryBtn
          onClick={() => {
            if (files.length > 0) {
              onUpload(files[0], resetFiles); // Pass resetFiles function
            }
          }}
          text={!isLoading ? "Upload" : ""}
          icon={
            isLoading ? (
              <LoadingSpinner borderColor="border-white" className="mx-auto" />
            ) : undefined
          }
          disabled={files.length === 0 || isValidating || isLoading}
          className="w-[90px] bg-primary ml-auto mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};
