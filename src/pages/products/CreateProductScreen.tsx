import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SelectField from "@/components/customFields/Select/SelectField";
import CheckBoxField from "@/components/customFields/combo/CheckBoxField";
import RadioBoxField from "@/components/customFields/combo/RadioBoxField";
import DatePicker from "@/components/customFields/date/DatePicker";
import CustomField from "@/components/customFields/input/CustomInput";
import InputField from "@/components/customFields/input/InputField";
import NumberField from "@/components/customFields/input/NumberField";
import TextAreaField from "@/components/customFields/input/TextAreaField";
import { HandlerProps } from "@/components/customFields/type";
import DashboardLayout from "@/components/dashboard/Layout";
import { barCodeOptions, productDefaults, productStatusOptions } from "@/defaults";
import { objectDifference } from "@/helpers";
import { useGeneralMutation } from "@/hooks/request/useGeneralMutation";
import { useGeneralQuery } from "@/hooks/request/useGeneralQuery";
import { GetManyProps } from "@/hooks/types";
import { useError } from "@/hooks/useError";
import { useFormFieldUpdate } from "@/hooks/useFormFieldUpdate";
import { ProductBrandProps } from "@/interfaces/productBrands";
import { ProductCategoryProps } from "@/interfaces/productCategories";
import { ProductCodeProps } from "@/interfaces/productCode";
import { ProductUnitProps } from "@/interfaces/productUnits";
import { ProductProps } from "@/interfaces/products";
import { SupplierProps } from "@/interfaces/supplier";
import { Validator } from "@/validator";
import { DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TitleHeader = ({ text }: { text: string }) => {
  return <h1 className="text-xl font-light mb-2">{text}</h1>;
};

const CreateProductScreen = () => {
  const navigate = useNavigate();
  const handleFieldChange = (data: HandlerProps) => {
    const { key, value } = data;
    if (key && key === "canExpire" && !value) {
      updateFormFieldValue("expirationDate", null);
    }
    updateFormFieldValue(key, value);
  };
  const { isPending, mutate } = useGeneralMutation({
    httpMethod: "post",
    mutationKey: ["createProduct"],
    url: "/products",
    requireAuth: true
  });
  const { addErrors, errors, resetError } = useError<ProductProps>();
  const { formValues, updateFormFieldValue } = useFormFieldUpdate(productDefaults());
  const { data: categoryData } = useGeneralQuery<GetManyProps<ProductCategoryProps>>({
    queryKey: ["productCategories", {}],
    url: "/product-categories",
    query: { deleted: false, columns: "name" },
    requireAuth: true
  });
  const { data: unitData } = useGeneralQuery<GetManyProps<ProductUnitProps>>({
    queryKey: ["productUnits", {}],
    url: "/product-units",
    query: { deleted: false, columns: "name,title" },
    requireAuth: true
  });
  const { data: brandData } = useGeneralQuery<GetManyProps<ProductBrandProps>>({
    queryKey: ["productBrands", {}],
    url: "/product-brands",
    query: { deleted: false, columns: "name" },
    requireAuth: true
  });
  const { data: codeData } = useGeneralQuery<GetManyProps<ProductCodeProps>>({
    queryKey: ["productCodes", {}],
    url: "/product-codes",
    query: { deleted: false, columns: "code" },
    requireAuth: true
  });
  const { data: supplierData } = useGeneralQuery<GetManyProps<SupplierProps>>({
    queryKey: ["suppliers", {}],
    url: "/suppliers",
    query: { deleted: false, columns: "name" },
    requireAuth: true
  });
  const categoriesOptions =
    categoryData?.data.map((category) => {
      return {
        label: category.name,
        value: category._id
      };
    }) || [];
  const unitOptions =
    unitData?.data.map((unit) => {
      return {
        label: `${unit.title} (${unit.name})`,
        value: unit._id
      };
    }) || [];
  const brandOptions =
    brandData?.data.map((brand) => {
      return {
        label: `${brand.name}`,
        value: brand._id
      };
    }) || [];
  const codeOptions =
    codeData?.data.map((code) => {
      return {
        label: `${code.code}`,
        value: code._id
      };
    }) || [];
  const supplierOptions =
    supplierData?.data.map((supplier) => {
      return {
        label: `${supplier.name}`,
        value: supplier._id
      };
    }) || [];

  const handleSubmit = () => {
    const validator = new Validator<ProductProps>({
      formData: formValues as any,
      rules: {
        brandId: "required",
        availability: "required",
        categoryId: "required",
        description: "required|minLength:5",
        name: "required|minLength:5",
        barcodeSymbology: "required",
        productCodeId: "required",
        productSellingPrice: "required|isNumber|minValue:0.1",
        productUnitPrice: "required|isNumber|minValue:0.1",
        unitId: "required",
        status: "required|in:active,inactive,draft",
        supplierId: "required",
        weight: "required|isNumber"
      },
      customFieldKeys: {
        brandId: "Product brand",
        availability: "Availability",
        categoryId: "Product category",
        description: "Product description",
        name: "Product name",
        barcodeSymbology: "Barcode symbology",
        productCodeId: "Product code",
        productSellingPrice: "Selling price",
        productUnitPrice: "Unit price",
        unitId: "Product unit",
        status: "Status",
        supplierId: "Product Supplier",
        weight: "Weight"
      }
    });

    validator.validate();
    if (validator.failed()) {
      return addErrors(validator.getValidationErrorsByIndex());
    }
    resetError();

    const payload = objectDifference(productDefaults(), formValues);
    payload.supplierId = "89977396-57b5-4ef2-8b9f-c8dc4871799d";
    mutate(
      { payload },
      {
        onSuccess() {
          toast.success("Success", {
            description: "Product created"
          });
          navigate("/products");
        }
      }
    );
  };
  return (
    <DashboardLayout pageTitle="Create Product">
      <Container className="border border-gray-50">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="left-content">
            {/* Description */}
            <div className="description mb-3">
              <TitleHeader text="Description" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <InputField
                  handleInputChange={handleFieldChange}
                  fieldKey="name"
                  label="Product Name"
                  value={formValues?.name}
                  isRequired
                  errorMessage={errors?.name}
                />
                <TextAreaField
                  handleInputChange={handleFieldChange}
                  name="description"
                  label="Product Description"
                  value={formValues?.description}
                  isRequired
                  errorMessage={errors?.description}
                />
              </div>
            </div>
            {/* Product Code */}
            <div className="product-code mb-3">
              <TitleHeader text="Product Code" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <SelectField
                  fieldKey="productCodeId"
                  label="Product Code"
                  selectValue={formValues?.productCodeId}
                  onChange={handleFieldChange}
                  isRequired
                  options={codeOptions}
                  closeOnSelect
                  errorMessage={errors?.productCodeId}
                />
              </div>
            </div>
            {/* Category */}
            <div className="category mb-3">
              <TitleHeader text="Category" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <SelectField
                  fieldKey="categoryId"
                  label="Product Category"
                  selectValue={formValues?.categoryId}
                  onChange={handleFieldChange}
                  isRequired
                  options={categoriesOptions}
                  closeOnSelect
                  errorMessage={errors?.categoryId}
                />
                <SelectField
                  fieldKey="supplierId"
                  label="Product Supplier"
                  selectValue={formValues?.supplierId}
                  onChange={handleFieldChange}
                  isRequired
                  options={supplierOptions}
                  closeOnSelect
                  errorMessage={errors?.supplierId}
                />
                <SelectField
                  fieldKey="brandId"
                  label="Product Brand"
                  selectValue={formValues?.brandId}
                  onChange={handleFieldChange}
                  isRequired
                  options={brandOptions}
                  closeOnSelect
                  errorMessage={errors?.brandId}
                />
                <SelectField
                  fieldKey="unitId"
                  label="Product Unit"
                  selectValue={formValues?.unitId}
                  onChange={handleFieldChange}
                  isRequired
                  options={unitOptions}
                  closeOnSelect
                  errorMessage={errors?.unitId}
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="inventory mb-3">
              <TitleHeader text="Inventory" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <NumberField
                  handleInputChange={handleFieldChange}
                  fieldKey="alertQuantity"
                  label="Alert Quantity"
                  value={formValues?.alertQuantity}
                  min={0}
                />
              </div>
            </div>

            {/* Selling Type */}
            <div className="selling-type mb-3">
              <TitleHeader text="Selling Type" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <RadioBoxField
                  fieldKey="availability"
                  handleFieldChange={handleFieldChange}
                  options={[
                    { label: "Available online only", value: "onlineOnly" },
                    { label: "Available offline only", value: "offlineOnly" },
                    { label: "Available both online and offline", value: "bothOnlineAndOffLine" }
                  ]}
                  value={formValues?.availability}
                  errorMessage={errors?.availability}
                />
              </div>
            </div>

            {/* VARIANT */}
            {/* <div className="variant mb-3">
              <TitleHeader text="Variant" />
              <button className="mt-2 border border-gray-100 rounded-sm p-2">+ Add Variant</button>
            </div> */}
          </div>

          <div className="right-content">
            {/* Product Images */}
            {/* <div className="photo mb-3">
              <TitleHeader text="Product Images" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <div className="flex space-x-4">
                  <div className="border border-gray-300 rounded-sm w-32 h-32 flex items-center justify-center">
                    Click to upload or drag and drop
                  </div>
                  <div className="border border-gray-300 rounded-sm w-32 h-32 flex items-center justify-center">
                    Replace
                  </div>
                  <div className="border border-gray-300 rounded-sm w-32 h-32 flex items-center justify-center">
                    Remove
                  </div>
                </div>
              </div>
            </div> */}
            {/* Pricing */}
            <div className="pricing mb-3">
              <TitleHeader text="Pricing" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <CustomField
                    fieldKey="productUnitPrice"
                    handleInputChange={handleFieldChange}
                    label="Unit Price"
                    icon={{
                      element: DollarSign,
                      position: "left",
                      show: true
                    }}
                    type="number"
                    value={formValues?.productUnitPrice}
                    isRequired
                    errorMessage={errors?.productUnitPrice}
                  />
                  <CustomField
                    fieldKey="productSellingPrice"
                    handleInputChange={handleFieldChange}
                    label="Selling Price"
                    type="number"
                    icon={{
                      element: DollarSign,
                      position: "left",
                      show: true
                    }}
                    value={formValues?.productSellingPrice}
                    isRequired
                    errorMessage={errors?.productSellingPrice}
                  />
                </div>
              </div>
            </div>
            {/* Shipping and Delivery */}
            <div className="shipping mb-3">
              <TitleHeader text="Dimensions" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <NumberField
                  fieldKey="weight"
                  handleInputChange={handleFieldChange}
                  label="Items Weight (kg)"
                  min={0}
                  isRequired
                  errorMessage={errors?.weight}
                  value={formValues?.weight}
                />
                <div className="grid grid-cols-3 gap-4">
                  <NumberField
                    fieldKey="dimensions.length"
                    handleInputChange={handleFieldChange}
                    label="Length"
                    value={formValues?.dimensions?.length}
                    min={0}
                  />
                  <NumberField
                    fieldKey="dimensions.width"
                    handleInputChange={handleFieldChange}
                    label="Width"
                    value={formValues?.dimensions?.width}
                    min={0}
                  />
                  <NumberField
                    fieldKey="dimensions.height"
                    handleInputChange={handleFieldChange}
                    label="Height"
                    value={formValues?.dimensions?.height}
                    min={0}
                  />
                </div>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="additional mb-3">
              <TitleHeader text="Additional Information" />
              <div className="border border-gray-100 rounded-sm p-4 space-y-3">
                <CheckBoxField
                  handleFieldChange={handleFieldChange}
                  name="canExpire"
                  label="Can Expire"
                  fieldKey="canExpire"
                  value={formValues?.canExpire}
                />
                {formValues.canExpire && (
                  <DatePicker
                    onChange={handleFieldChange}
                    fieldKey="expirationDate"
                    label="Expiration Date"
                    value={formValues?.expirationDate}
                  />
                )}
                <SelectField
                  onChange={handleFieldChange}
                  fieldKey="barcodeSymbology"
                  label="Barcode Symbology"
                  selectValue={formValues?.barcodeSymbology}
                  options={barCodeOptions}
                  closeOnSelect
                  isSearchable
                />
                <SelectField
                  onChange={handleFieldChange}
                  fieldKey="status"
                  label="Status"
                  selectValue={formValues?.status}
                  options={productStatusOptions}
                  closeOnSelect
                  isSearchable
                  isRequired
                  errorMessage={errors?.status}
                />
              </div>
            </div>

            {/* Add Product Button */}
            <div className="mt-4">
              <PrimaryButton text="Create Product" disabled={isPending} loading={isPending} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default CreateProductScreen;
