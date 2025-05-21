import { PrimaryBtn, SecondaryBtn } from "../buttons";
import { OutlinedInput } from "../inputs";
import { LoadingSpinner } from "../loaders";
import { WarningAlert } from "../warning-alert";
import { PopupModal, PopupModalProps } from "./popup-modal";

interface DeleteAccountPopupProps extends Omit<PopupModalProps, "children"> {
  handleConfirm: () => void;
  password: string;
  setPassword: (value: string) => void;
  validationError?: string;
  setValidationError: (error: string) => void;
  isLoading?: boolean;
}

export const DeleteAccountPopup = (props: DeleteAccountPopupProps) => {
  return (
    <PopupModal {...props} className="max-w-[400px]">
      <h4 className="text-2xl font-semibold text-center">Delete Account</h4>
      <div className="flex flex-col gap-3 mt-5">
        <WarningAlert text="Please be certain before proceeding." />
        <div className="bg-red-500 rounded-lg p-4">
          <p className="text-center text-white text-sm font-normal">
            This will permanently delete your account and all associated data.
          </p>
        </div>
        <OutlinedInput
          containerClassName="w-full"
          className={`!py-3 ${
            props.validationError ? "outline outline-1 outline-red-500" : ""
          }`}
          type="password"
          label="Confirm your Password"
          placeholder="Enter your password"
          error={props.validationError}
          name="Password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center gap-3 mt-4">
          <SecondaryBtn
            onClick={props.onClose}
            text="Cancel"
            className="w-full justify-center border-gray-500"
          />
          <PrimaryBtn
            onClick={props.handleConfirm}
            text={!props.isLoading ? "Continue" : ""}
            icon={
              props.isLoading ? (
                <LoadingSpinner
                  borderColor="border-white"
                  className="mx-auto"
                />
              ) : undefined
            }
            className="w-full bg-red-500 border border-red-500"
          />
        </div>
      </div>
    </PopupModal>
  );
};
