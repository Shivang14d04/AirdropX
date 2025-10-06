import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  large?: boolean; // determines if we render a textarea
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder = "",
  type = "text",
  onChange,
  large = false,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Input or Textarea */}
      {large ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-900"
          rows={5}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        />
      )}
    </div>
  );
};

export default InputField;
