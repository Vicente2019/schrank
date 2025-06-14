import React from "react";

type TextInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
};

export default function TextInput({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}
