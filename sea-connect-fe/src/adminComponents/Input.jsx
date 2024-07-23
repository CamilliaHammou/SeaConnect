import React from "react";

const Input = ({
  className,
  label,
  name,
  type,
  id,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`text-gray-700 rounded w-full px-4 py-2 border-2 border-slate-500 focus:border-blue-400 outline-none ${className}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
