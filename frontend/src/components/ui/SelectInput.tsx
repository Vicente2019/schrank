import React from "react";

type SelectInputProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

export default function SelectInput({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}: SelectInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 bg-neutral-50 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
