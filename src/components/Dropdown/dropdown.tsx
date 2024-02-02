import React, { useEffect, useRef, useState } from "react";

// assests
import styles from "./Dropdown.module.scss";
import { DROPDOWN_ICON } from "../../assets/Images";
import TextStyle from "../TextStyle/textStyle";

interface DropdownProps {
  options: any;
  onSelect: any;
  placeholdertext?: string;
  optionKey?: any;
  customStyleForContainer?: any;
  customStyleForContainerForColor?: any;
  customStyleForText?: any;
  label?: any;
  error?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholdertext,
  customStyleForContainer,
  customStyleForContainerForColor,
  customStyleForText,
  label,
  error,
  optionKey = "value", // Set a default key, you can change it as needed
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    onSelect(option);
    // setSelectedOption(option);
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {label && (
        <TextStyle
          label={label}
          containerStyle={styles.textContainer}
          textStyle={styles.textStyleForDropDown}
        />
      )}
      <div
        className={`${styles.dropdownToggle} ${customStyleForContainer}`}
        style={customStyleForContainerForColor}
        onClick={toggleDropdown}
      >
        <div className={`${styles.truncateText}`} style={customStyleForText}>
          {placeholdertext}
          {/* {selectedOption ? selectedOption[optionKey] : placeholdertext} */}
        </div>
        <div className={styles.flexStyle}>
          <div style={{ display: "flex" }}>
            <img
              src={DROPDOWN_ICON}
              alt="downIcon"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdownOverlay}>
          <ul className={styles.dropdownOtions}>
            {options && options.length > 0 ? (
              <>
                {options.map((option: any, index: number) => (
                  <li key={index} onClick={() => handleOptionClick(option)}>
                    <div className={styles.truncateText}>
                      {option[optionKey]}
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <div
                style={{
                  padding: " 20px 0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextStyle label="No Data Found" />
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
