"use client";
import React from "react";
import styles from "./inputGroup.module.css"; // Create this file or reuse your existing styles

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
    <div className={styles.inputGroup}>
      <label>{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
    </div>
  );
};

export default InputGroup;
