"use client";
import React from "react";

interface InputGroupProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // showInput?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  placeholder,
  value,
  onChange,
  // showInput = true,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-[#7D887A] text-[1.5rem] max-md:text-[1rem]">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-2 border-none border-b border-b-[#ccc] bg-transparent outline-none text-[1.5rem] text-[#77A6A1] max-md:text-[1rem] placeholder:text-[#C2CDD3] placeholder:text-[1.2rem] max-md:placeholder:text-[1rem]"
        />
    </div>
  );
};

export default InputGroup;
