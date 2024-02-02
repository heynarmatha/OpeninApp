import styles from "./buttonStyle.module.scss";

const CustomButton = ({
  text,
  onclickForBtn,
  disabled,
  icon,
  outline = false,
  btnContainerStyle,
  btnStyle,
  iconStyle,
}: any) => {
  return (
    <button
      onClick={onclickForBtn}
      className={` ${styles.btnContainer} ${btnContainerStyle}`}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={disabled}
    >
      {icon && <img src={icon} alt="icon" className={iconStyle} />}

      <div className={btnStyle ? btnStyle : ""}>{text}</div>
    </button>
  );
};

export default CustomButton;
