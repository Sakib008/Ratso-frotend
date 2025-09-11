import React, { type HTMLInputTypeAttribute, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      type = "text",
      label,
      error,
      containerClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("w-full space-y-2", containerClassName)}>
        {(label || name) && (
          <label
            className={cn(
              "block text-sm font-medium text-gray-700 dark:text-gray-300",
              labelClassName
            )}
            htmlFor={name}
          >
            {label || name}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          className={cn(
            // Base styles
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
            // Focus styles
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            // Dark mode styles
            "dark:border-gray-600 dark:bg-gray-700 dark:text-white",
            "dark:focus:ring-blue-400 dark:focus:border-blue-400",
            // Disabled styles
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "dark:disabled:bg-gray-800 dark:disabled:text-gray-400",
            // Error styles
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            // Custom className from props
            className,
            inputClassName
          )}
          {...props}
        />
        {error && (
          <p
            className={cn(
              "text-sm text-red-600 dark:text-red-400",
              errorClassName
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
