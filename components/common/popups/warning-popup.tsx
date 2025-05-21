import { PrimaryBtn, SecondaryBtn } from "../buttons";
import { LoadingSpinner } from "../loaders";
import { WarningAlert } from "../warning-alert";
import { PopupModal, PopupModalProps } from "./popup-modal";

interface WarningPopupProps extends Omit<PopupModalProps, "children"> {
  handleConfirm: () => void;
  isLoading?: boolean;
  heading: string;
  description?: string;
  warningAlert?: string;
}

export const WarningPopup = (props: WarningPopupProps) => {
  return (
    <PopupModal {...props} className="max-w-[400px]">
      <h4 className="text-2xl font-semibold text-center">{props.heading}</h4>
      <div className="flex flex-col gap-3 mt-5">
        <WarningAlert text={props.warningAlert ?? ""} />
        <div className="bg-red-500 rounded-lg p-4">
          <p className="text-center text-white text-sm font-normal">
            {props.description}
          </p>
        </div>
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
