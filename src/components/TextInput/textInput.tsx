// InputField.tsx
import React, { ChangeEvent, useState } from "react";
import styles from "./textInputStyle.module.scss";
import TextStyle from "../TextStyle/textStyle";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  customStyleForLable?: any;
  customStyleForInput?: any;
  inputFieldCustom?: any;
  maxLength?: any;
  customStyleForInputContainer?: any;
  inputFieldCustomForColor?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  customStyleForLable,
  customStyleForInput,
  inputFieldCustom,
  inputFieldCustomForColor,
  maxLength,
  customStyleForInputContainer,
}) => {
  return (
    <div
      className={styles.inputFieldContainer}
      style={customStyleForInputContainer}
    >
      <TextStyle
        label={label}
        containerStyle={`${styles.textContainer} ${customStyleForLable}`}
      />
      <div
        className={`${styles.inputField} ${inputFieldCustom}`}
        style={inputFieldCustomForColor}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={customStyleForInput}
          maxLength={maxLength}
          style={inputFieldCustom}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
