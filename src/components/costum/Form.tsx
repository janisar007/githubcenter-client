import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type {
  SubmitHandler,
  UseFormReturn,
  FieldValues,
  Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FiAlertCircle,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";

// Types
export type FormField = {
  name: string;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "checkbox"
    | "multiselect"
    | "textarea"
    | "date";
  placeholder?: string;
  defaultValue?: any;
  options?: { value: string | number; label: string }[];
  validation?: any; // Zod schema
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
  descriptionClassName?: string;
  required?: boolean;
  disabled?: boolean;

  //for the multiselect option
  renderSelected?: (option: {
    value: string | number;
    label: string;
  }) => React.ReactNode;
  renderOption?: (option: {
    value: string | number;
    label: string;
  }) => React.ReactNode;
  maxSelections?: number;
};

export type FormProps<T extends FieldValues> = {
  fields: FormField[];
  onSubmit: SubmitHandler<T>;
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  className?: string;
  formClassName?: string;
  submitButtonText?: string;
  submitButtonClassName?: string;
  resetButtonText?: string;
  resetButtonClassName?: string;
  buttonsContainerClassName?: string;
  formMethods?: UseFormReturn<T>;
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  shouldUnregister?: boolean;
  shouldFocusError?: boolean;
  renderCustomField?: (args: {
    field: FormField;
    methods: UseFormReturn<T>;
    className: string;
  }) => React.ReactNode;
};

interface MultiSelectProps {
  field: FormField;
  methods: UseFormReturn<any>;
  className: string;
}

const MultiSelectField: React.FC<MultiSelectProps> = ({
  field,
  methods,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const values = methods.watch(field.name) || [];
  const isArray = Array.isArray(values);

  const filteredOptions =
    field.options?.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const toggleOption = (optionValue: string | number) => {
    const currentValue = methods.getValues(field.name);
    let newValue: any[] = [];

    if (isArray) {
      newValue = Array.isArray(currentValue) ? [...currentValue] : [];
    } else {
      newValue = currentValue ? [currentValue] : [];
    }

    const index = newValue.findIndex((val) => val === optionValue);

    if (index >= 0) {
      newValue.splice(index, 1);
    } else {
      if (field.maxSelections && newValue.length >= field.maxSelections) return;
      newValue.push(optionValue);
    }

    methods.setValue(
      field.name,
      isArray ? newValue : newValue[0] || null,
      {
        shouldValidate: true,
      }
    );
  };

  const removeOption = (optionValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleOption(optionValue);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Selected values display */}
      <div
        className={`${className} flex flex-wrap items-center gap-1 min-h-[38px] cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {values?.length > 0 ? (
          isArray ? (
            values.map((value) => {
              const option = field.options?.find((opt) => opt.value === value);
              return option ? (
                field.renderSelected ? (
                  field.renderSelected(option)
                ) : (
                  <span
                    key={value}
                    className="inline-flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={(e) => removeOption(value, e)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )
              ) : null;
            })
          ) : (
            <span>
              {field.options?.find((opt) => opt.value === values)?.label}
            </span>
          )
        ) : (
          <span className="text-gray-400">
            {field.placeholder || "Select options..."}
          </span>
        )}
        <div className="ml-auto">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          {/* Search input */}
          {field.options && field.options.length > 5 && (
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-1 text-sm border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* Options list */}
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-3 py-2 text-sm cursor-pointer flex items-center ${
                    values?.includes(option.value)
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleOption(option.value)}
                >
                  {field.renderOption ? (
                    field.renderOption(option)
                  ) : (
                    <>
                      <span className="mr-2">
                        {values?.includes(option.value) && <FiCheck />}
                      </span>
                      <span>{option.label}</span>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export function Form<T extends FieldValues>({
  fields,
  onSubmit,
  schema,
  defaultValues,
  className = "",
  formClassName = "",
  submitButtonText = "Submit",
  submitButtonClassName = "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded",
  resetButtonText = "Reset",
  resetButtonClassName = "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded",
  buttonsContainerClassName = "flex space-x-3 justify-end mt-6",
  formMethods,
  mode = "onSubmit",
  shouldUnregister = false,
  shouldFocusError = true,
  renderCustomField,
}: FormProps<T>) {
  const methods =
    formMethods ||
    useForm<T>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues as any,
      mode,
      shouldUnregister,
      shouldFocusError,
    });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      ...methods.register(field.name as Path<T>),
      className: `w-full px-3 py-[0.29rem] border rounded-md shadow-sm focus:outline-none focus:shadow-md text-sm ${
        methods.formState.errors[field.name]
          ? "border-red-500"
          : "border-gray-300"
      } ${field.inputClassName || ""}`,
      placeholder: field.placeholder,
      disabled: field.disabled,
    };

    if (renderCustomField) {
      return renderCustomField({
        field,
        methods,
        className: commonProps.className,
      });
    }

    switch (field.type) {
      case "select":
        return (
          <select {...commonProps}>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "multiselect":
        return (
          <MultiSelectField
            field={field}
            methods={methods}
            className={commonProps.className}
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            {...commonProps}
            className={`custom-checkbox ${field.inputClassName || ""}`}
          />
        );
      case "textarea":
        return <textarea rows={4} {...commonProps} />;
      default:
        return <input type={field.type || "text"} {...commonProps} />;
    }
  };

  return (
    <div className={`${className}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-4 ${formClassName}`}
        >
          {fields.map((field) => (
            <div key={field.name} className={`mb-4 ${field.className || ""} `}>
              {field.label && (
                <label
                  htmlFor={field.name}
                  className={`block text-sm font-semibold text-cgray-dtext mb-1 ${
                    field.labelClassName || ""
                  }`}
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
              )}

              {field.description && (
                <p
                  className={`text-sm text-gray-500 mb-2 ${
                    field.descriptionClassName || ""
                  }`}
                >
                  {field.description}
                </p>
              )}

              {renderField(field)}

              {methods.formState.errors[field.name] && (
                <p
                  className={`mt-1 text-sm text-red-600 flex items-center ${
                    field.errorClassName || ""
                  }`}
                >
                  <FiAlertCircle className="mr-1" />
                  {methods.formState.errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          <div className={buttonsContainerClassName}>
            {resetButtonText && (
              <button
                type="button"
                onClick={() => reset()}
                className={resetButtonClassName}
                disabled={isSubmitting}
              >
                {resetButtonText}
              </button>
            )}
            <button
              type="submit"
              className={submitButtonClassName}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : submitButtonText}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

// import { Form, type FormField } from '@/components/costum/Form';
// import { z } from 'zod';

// // 1. Define validation schema
// const userSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   age: z.number().min(18, 'You must be at least 18 years old'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   confirmPassword: z.string(),
//   bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
//   terms: z.boolean().refine(val => val, 'You must accept the terms'),
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// type UserFormData = z.infer<typeof userSchema>;

// // 2. Define form fields
// const userFormFields: FormField[] = [
//   {
//     name: 'name',
//     label: 'Full Name',
//     type: 'text',
//     placeholder: 'john doe',
//     validation: z.string().min(2),
//     className: 'col-span-2',
//   },
//   {
//     name: 'email',
//     label: 'Email Address',
//     type: 'email',
//     placeholder: 'your@email.com',
//   },
//   {
//     name: 'age',
//     label: 'Age',
//     type: 'number',
//     placeholder: 'Enter your age',
//     inputClassName: 'w-24',
//   },
//   {
//     name: 'password',
//     label: 'Password',
//     type: 'password',
//     placeholder: 'Create a password',
//   },
//   {
//     name: 'confirmPassword',
//     label: 'Confirm Password',
//     type: 'password',
//     placeholder: 'Confirm your password',
//   },
//   {
//     name: 'bio',
//     label: 'Biography',
//     type: 'textarea',
//     placeholder: 'Tell us about yourself',
//     className: 'col-span-2',
//     description: 'Maximum 500 characters',
//   },
//   {
//     name: 'terms',
//     label: 'I agree to the terms and conditions',
//     type: 'checkbox',
//     className: "",
//     labelClassName: 'inline-flex items-center',
//     inputClassName: 'mr-2',
//   },
// ];

// // 3. Define form component
// const AddGithubDialogBox = ({ initialData }: { initialData?: Partial<UserFormData> }) => {
//   const handleSubmit = (data: UserFormData) => {
//     console.log('Form submitted:', data);
//     // Handle form submission (API call, etc.)
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-2 bg-white rounded-lg">

//       <Form<UserFormData>
//         fields={userFormFields}
//         onSubmit={handleSubmit}
//         schema={userSchema}
//         defaultValues={initialData}
//         formClassName="grid grid-cols-2 gap-4"
//         submitButtonClassName="blue-button"
//         resetButtonClassName="white-button"
//         buttonsContainerClassName="flex space-x-3 justify-end mt-6 col-span-2"
//       />
//     </div>
//   );
// };

// export default AddGithubDialogBox;
