// TextStyle.tsx
import React from "react";
import styles from "./style.module.scss";

type TextStyleProps = {
  label: string;
  containerStyle?: string;
  textStyle?: string;
};

const TextStyle: React.FC<TextStyleProps> = ({
  label,
  containerStyle,
  textStyle,
}) => {
  return (
    <div className={containerStyle}>
      <h5 className={`${styles.textStyle} ${textStyle}`}>{label}</h5>
    </div>
  );
};

export default TextStyle;
