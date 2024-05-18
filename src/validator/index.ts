class ValidatorCheck {
  required(fieldValue: string | number | any[]): boolean {
    if (Array.isArray(fieldValue)) return fieldValue.length > 0;
    return Boolean(fieldValue);
  }

  minValue(fieldValue: number, minValue: number): boolean {
    return fieldValue >= minValue;
  }

  maxValue(fieldValue: number, maxValue: number): boolean {
    return fieldValue <= maxValue;
  }

  minLength(fieldValue: string, minLength: number): boolean {
    return fieldValue.length >= minLength;
  }

  maxLength(fieldValue: string, maxLength: number): boolean {
    return fieldValue.length <= maxLength;
  }

  isEmail(fieldValue: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue);
  }

  isUrl(fieldValue: string): boolean {
    return /^((https):\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}$/.test(fieldValue);
  }

  isPassword(fieldValue: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    return passwordRegex.test(fieldValue);
  }
  isNumber(fieldValue: string): boolean {
    return /^\d+$/.test(fieldValue);
  }

  isString(fieldValue: string): boolean {
    return /^[a-zA-Z]+$/.test(fieldValue);
  }

  isAlphaNumeric(fieldValue: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(fieldValue);
  }

  in(fieldValue: string | number, ruleSet: string[]): boolean {
    return ruleSet.includes(String(fieldValue));
  }

  isBetween(fieldValue: number, ruleSet: string): boolean {
    const [minValue, maxValue] = ruleSet.split(",").map(Number);
    return fieldValue >= minValue && fieldValue <= maxValue;
  }

  // private isAlphaNumericSpace(fieldValue: string): boolean {
  //     return /^[a-zA-Z0-9\s]+$/.test(fieldValue);
  // }

  // private isAlphaNumericSpaceHyphen(fieldValue: string): boolean {
  //     return /^[a-zA-Z0-9\s-]+$/.test(fieldValue);
  // }

  // private isAlphaNumericSpaceHyphenUnderscore(fieldValue: string): boolean {
  //     return /^[a-zA-Z0-9\s-_]+$/.test(fieldValue);
  // }

  // private isAlphaNumericSpaceHyphenUnderscorePeriod(fieldValue: string): boolean {
  //     return /^[a-zA-Z0-9\s-_\.]+$/.test(fieldValue);
  // }

  // private isAlphaNumericSpaceHyphenUnderscorePeriodExclamation(fieldValue: string): boolean {
  //     return /^[a-zA-Z0-9\s-_\.!]+$/.test(fieldValue);
  // }
}

type RuleSet<T> = {
  [Property in keyof T]?: string;
};

export class Validator<TFormData> {
  private formData: { [P in keyof TFormData]: any };
  private rules: RuleSet<TFormData>;
  private validationErrors: { field: keyof TFormData; messages: string[] }[];
  private validatorCheck: ValidatorCheck;

  constructor(data: { formData: { [P in keyof TFormData]: string }; rules: RuleSet<TFormData> }) {
    this.formData = data.formData;
    this.rules = data.rules;
    this.validationErrors = [];
    this.validatorCheck = new ValidatorCheck();
  }
  private addValidationError(fieldKey: keyof TFormData, message: string): void {
    const errorIndex = this.validationErrors.findIndex((error) => error.field === fieldKey);
    if (errorIndex !== -1) {
      this.validationErrors[errorIndex].messages.push(message);
    } else {
      this.validationErrors.push({
        field: fieldKey,
        messages: [message]
      });
    }
  }

  validate(): void {
    for (const fieldKey in this.rules) {
      const fieldValue = this.formData[fieldKey];

      const rules =
        this.rules && this.rules[fieldKey] && Object.keys(this.rules).includes(fieldKey)
          ? this.rules[fieldKey]!.split("|")
          : [];
      const ruleMapper = rules.map((rule) => {
        const [ruleName, ruleValue] = rule.split(":");
        return {
          ruleValue: ruleValue || undefined,
          ruleName
        };
      });

      ruleMapper.forEach((ruleMap) => {
        const { ruleName, ruleValue } = ruleMap;
        switch (ruleName) {
          case "required":
            const requiredPassed = this.validatorCheck.required(fieldValue);
            if (!requiredPassed) {
              this.addValidationError(fieldKey, `${fieldKey} is required`);
            }
            break;
          case "minValue":
            const minValuePassed = this.validatorCheck.minValue(fieldValue, parseFloat(ruleValue!));
            if (!minValuePassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be greater than or equal to ${ruleValue}`);
            }
            break;
          case "maxValue":
            const maxValuePassed = this.validatorCheck.maxValue(fieldValue, parseFloat(ruleValue!));
            if (!maxValuePassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be less than or equal to ${ruleValue}`);
            }
            break;
          case "minLength":
            const minLengthPassed = this.validatorCheck.minLength(fieldValue, parseInt(ruleValue!));
            if (!minLengthPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must have a minimum length of ${ruleValue}`);
            }
            break;
          case "maxLength":
            const maxLengthPassed = this.validatorCheck.maxLength(fieldValue, parseInt(ruleValue!));
            if (!maxLengthPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must have a maximum length of ${ruleValue}`);
            }
            break;
          case "isEmail":
            const isEmailPassed = this.validatorCheck.isEmail(fieldValue);
            if (!isEmailPassed) {
              this.addValidationError(fieldKey, `The ${fieldKey} field must be a valid email address`);
            }
            break;
          case "sameAs":
            const sameAsField = ruleValue as keyof TFormData;
            const sameAsValue = this.formData[sameAsField];
            if (fieldValue !== sameAsValue) {
              this.addValidationError(fieldKey, `The field ${fieldKey} must be the same as ${String(sameAsField)}`);
            }
            break;
          case "isPassword":
            if (!this.validatorCheck.isPassword(fieldValue)) {
              this.addValidationError(
                fieldKey,
                `The field ${fieldKey} must be a valid password.${fieldKey} should contain at least one uppercase letter, one lowercase letter, one number, one special character, and is at least 8 characters long.`
              );
            }
            break;
          case "isUrl":
            const isUrlPassed = this.validatorCheck.isUrl(fieldValue);
            if (!isUrlPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be a valid URL`);
            }
            break;
          case "isNumber":
            const isNumberPassed = this.validatorCheck.isNumber(fieldValue);
            if (!isNumberPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be a valid number`);
            }
            break;
          case "isString":
            const isStringPassed = this.validatorCheck.isString(fieldValue);
            if (!isStringPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be a valid string`);
            }
            break;
          case "isAlphaNumeric":
            const isAlphaNumericPassed = this.validatorCheck.isAlphaNumeric(fieldValue);
            if (!isAlphaNumericPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be alphanumeric`);
            }
            break;
          case "in":
            const inPassed = this.validatorCheck.in(fieldValue, ruleValue!.split(","));
            if (!inPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be one of the specified values`);
            }
            break;
          case "isBetween":
            const isBetweenPassed = this.validatorCheck.isBetween(parseFloat(fieldValue), ruleValue!);
            if (!isBetweenPassed) {
              this.addValidationError(fieldKey, `${fieldKey} must be between ${ruleValue}`);
            }
            break;
          case "customValidator":
            if (ruleValue) {
              const passed = JSON.parse(String(ruleValue));
              if (!passed) {
                this.addValidationError(fieldKey, `${fieldKey} failed the custom validation`);
              }
            } else {
              this.addValidationError(fieldKey, `${fieldKey} failed the custom validation`);
            }
            break;

          default:
            break;
        }
      });
    }
  }

  addCustomValidation(data: {
    fieldKey: keyof TFormData;
    fieldPassed: (value?: any) => boolean;
    errorMessage?: string;
  }) {
    const { fieldKey, fieldPassed } = data;
    if (this.formData[data.fieldKey]) {
      const passed = fieldPassed(this.formData[data.fieldKey]);
      this.rules = { ...this.rules, [fieldKey]: `customValidator:${passed}` };
    }
  }

  failed(): boolean {
    return this.validationErrors.length > 0;
  }

  passed(): boolean {
    return !this.failed();
  }

  errors() {
    return this.validationErrors;
  }

  getFieldError(fieldKey: string) {
    return this.errors().find((error) => error.field === fieldKey);
  }
  addError(fieldKey: keyof TFormData, messages: string[]) {
    this.validationErrors.push({ field: fieldKey, messages });
  }
  getValidationErrorsByIndex(index = 0) {
    const errors: { [P in keyof TFormData]?: string } = {};

    this.errors().forEach((err) => {
      errors![err.field] = err.messages[index];
    });
    return errors;
  }
}
