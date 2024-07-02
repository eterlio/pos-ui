import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ModalActionButtonProps } from "@/interfaces";
import { FC, ReactNode, memo } from "react";

interface ModalProps {
  showModal?: boolean;
  modalTitle?: string;
  modalDescription?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionButtons?: ModalActionButtonProps[];
  children?: ReactNode;
}
const Modal: FC<ModalProps> = ({
  showModal,
  modalTitle,
  modalDescription,
  actionButtons,
  titleClassName,
  descriptionClassName,
  children
}) => {
  return (
    <AlertDialog open={showModal}>
      <AlertDialogTrigger asChild>
        <AlertDialogContent className="max-h-[98vh] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className={`my-3 ${titleClassName || ""}`}>{modalTitle && modalTitle}</AlertDialogTitle>
            <AlertDialogDescription
              dangerouslySetInnerHTML={{ __html: modalDescription || "" }}
              className={descriptionClassName || ""}
            ></AlertDialogDescription>
          </AlertDialogHeader>
          {children && children}
          <AlertDialogFooter className="gap-4">
            {actionButtons &&
              actionButtons.map((button) => {
                return (
                  <div key={button.type}>
                    {button.type === "cancel" && (
                      <AlertDialogCancel
                        className={button.className || ""}
                        onClick={button.action}
                        disabled={button.disabled || button.loading}
                      >
                        {button.loading && (
                          <div className="animate-spin h-6 w-6 mr-3 border-4 rounded-full border-[#eee] border-r-[#10172a]"></div>
                        )}
                        {button.title}
                      </AlertDialogCancel>
                    )}
                    {button.type === "action" && (
                      <AlertDialogAction
                        className={button.className || ""}
                        onClick={button.action}
                        disabled={button.disabled || button.loading}
                      >
                        {button.loading && (
                          <div className="animate-spin h-6 w-6 mr-3 border-4 rounded-full border-[#10172a] border-r-[#eee]"></div>
                        )}
                        {button.title}
                      </AlertDialogAction>
                    )}
                  </div>
                );
              })}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogTrigger>
    </AlertDialog>
  );
};
export default memo(Modal);
