import DashboardLayout from "@/components/dashboard/Layout";
import PageContainer from "@/components/dashboard/PageContainer";
import Account from "./components/Account";
import Password from "./components/Password";
import { Button } from "@/components/ui/button";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { UserProps } from "@/interfaces/user";
import Modal from "@/components/Modal";
import { useCallback, useState } from "react";
import { ModalActionButtonProps } from "@/interfaces";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { HandlerProps } from "@/components/customFields/type";
import { toast } from "sonner";

const ProfileScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  const { data, isFetching } = useGeneralQuery<UserProps>({
    queryKey: ["me"],
    url: "/me",
    enabled: true
  });
  const { isPending, mutate } = useGeneralMutation<Partial<UserProps>>({
    httpMethod: "patch",
    mutationKey: [isUpdatePassword ? "updatePassword" : "updateMe"],
    url: isUpdatePassword ? "/auth/update-password" : "/auth/profile"
  });
  const { formValues, updateFormFieldValue } = useFormFieldUpdate({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const handlePasswordFieldChange = useCallback((data: HandlerProps) => {
    updateFormFieldValue(data.key, data.value);
  }, []);
  const passwordFieldsHasValue = Object.values(formValues).every((value) => value.length >= 8);

  const modalData = {
    showModal: openModal,
    modalTitle: `Update Your password`,
    modalDescription: `Fill in the inputs to update your password`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => {
          setOpenModal(false);
          setIsUpdatePassword(false);
        },
        type: "cancel"
      },
      {
        title: "Update Password",
        action: async () => {
          mutate(
            {
              payload: formValues as Record<string, string>
            },
            {
              onSuccess() {
                toast.success("Success", {
                  description: "Password updated"
                });
                setOpenModal(false);
                setIsUpdatePassword(false);
              }
            }
          );
        },
        type: "action",
        loading: isPending,
        disabled: !passwordFieldsHasValue
      }
    ] as ModalActionButtonProps[]
  };
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    setIsUpdatePassword(true);
  };
  return (
    <DashboardLayout pageTitle="Profile" pageDescription="Change your account details" isLoading={isFetching}>
      <PageContainer>
        <div className="flex items-center justify-between">
          <h1>Account Details</h1>
          <Modal
            showModal={modalData.showModal}
            modalTitle={"Update Password"}
            modalDescription={modalData.modalDescription}
            actionButtons={modalData.actionButtons}
          >
            <Password isLoading={isPending} formValues={formValues} handleFormFieldChange={handlePasswordFieldChange} />
          </Modal>
          <Button variant={"secondary"} size={"sm"} onClick={handleOpenModal}>
            Change Password
          </Button>
        </div>
        {data && <Account user={data} isLoading={isPending} mutate={mutate} />}
      </PageContainer>
    </DashboardLayout>
  );
};

export default ProfileScreen;
