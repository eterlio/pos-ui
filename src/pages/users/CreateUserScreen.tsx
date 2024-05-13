import Container from "@/components/Container";
import SelectField from "@/components/customFields/Select/Select";
import InputField from "@/components/customFields/input/InputField";
import PasswordInput from "@/components/customFields/input/Password";
import PhoneInputField from "@/components/customFields/input/Phone";
import Permission from "@/components/customFields/permission/Permission";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { GENDER_OPTIONS, ROLE_OPTIONS, USER_STATUS_OPTIONS, formReducer, permissionResources } from "@/utils";
import { useReducer } from "react";

const CreateUserScreen = () => {
  const userDefaultObj = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: null,
    phone: {
      prefix: "",
      number: "",
      country: ""
    },
    status: "pendingApproval",
    permission: null,
    confirmPassword: "",
    gender: ""
  };
  const [state, dispatch] = useReducer(formReducer(userDefaultObj), userDefaultObj);

  const handleFormFieldChange = (data: HandlerProps) => {
    dispatch({ type: "UPDATE_FIELD", fieldName: data.key, value: data.value });
  };
  return (
    <DashboardLayout pageTitle="Create User">
      <Container className="border border-gray-100">
        <h1>User Information</h1>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            <InputField
              name="firstName"
              handleInputChange={handleFormFieldChange}
              label={"First Name"}
              placeholder="First Name"
              id="firstName"
              isRequired
              value={state.firstName}
            />
            <InputField
              name="lastName"
              handleInputChange={handleFormFieldChange}
              label={"Last Name"}
              placeholder="Last Name"
              id="lastName"
              isRequired
              value={state.lastName}
            />
            <InputField
              name="email"
              handleInputChange={handleFormFieldChange}
              label={"Email"}
              placeholder="Email"
              id="email"
              isRequired
              value={state.email}
            />
            <PhoneInputField
              fieldKey="phone"
              handleInputChange={handleFormFieldChange}
              label={"Phone"}
              id="phone"
              value={state.phone}
            />
            <SelectField
              options={ROLE_OPTIONS}
              closeOnSelect
              isRequired
              onChange={handleFormFieldChange}
              label={"Role"}
              fieldKey={"role"}
              selectValue={state.role}
            />
            <SelectField
              options={GENDER_OPTIONS}
              closeOnSelect
              isRequired
              onChange={handleFormFieldChange}
              label={"Gender"}
              fieldKey={"gender"}
              selectValue={state.gender}
            />
            <SelectField
              options={USER_STATUS_OPTIONS}
              closeOnSelect
              isRequired
              onChange={handleFormFieldChange}
              label={"Status"}
              fieldKey={"status"}
              selectValue={state.status}
            />
            <PasswordInput
              handleInputChange={handleFormFieldChange}
              name="password"
              placeholder="Password"
              label={"Password"}
              value={state.password}
            />
            <PasswordInput
              handleInputChange={handleFormFieldChange}
              name="confirmPassword"
              placeholder="Confirm Password"
              label={"Confirm Password"}
              value={state.confirmPassword}
            />
          </div>
          <Permission
            onChange={handleFormFieldChange}
            fieldKey="permission"
            permissionResources={permissionResources}
          />
          <div className="flex items-center justify-end">
            <Button className="w-[200px]">Create</Button>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default CreateUserScreen;
