import React from "react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:border-blue-500",
  outlined: "border border-gray-400 focus:border-blue-600 bg-white",
  ghost: "border border-transparent bg-transparent focus:border-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  loading = false,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={clsx(
            "rounded-lg outline-none transition-colors w-full",
            sizeClasses[size],
            variantClasses[variant],
            {
              "border-red-500 focus:border-red-600": invalid,
              "opacity-50 cursor-not-allowed": disabled || loading,
            }
          )}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {invalid && errorMessage ? (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      ) : (
        helperText && (
          <p className="text-gray-500 text-xs mt-1">{helperText}</p>
        )
      )}
    </div>
  );
};
