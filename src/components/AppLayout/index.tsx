import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

//assets and images
import {
  BASE_LOGO_WHITE,
  BASE_LOGO_WHITE_WINDOW,
  DISCORD_GREY,
  DISCORD_WHITE,
  GIT_GREY,
  GIT_WHITE,
  LINKEDIN_GREY,
  LINKEDIN_WHITE,
  TWITTER_GREY,
  TWITTER_WHITE,
} from "../../assets/Images";
import styles from "./layout.module.scss";

const AppLayout = ({ children }: any) => {
  const socialNetworkWhite = [
    GIT_WHITE,
    TWITTER_WHITE,
    LINKEDIN_WHITE,
    DISCORD_WHITE,
  ];
  const socialNetworkGrey = [
    GIT_GREY,
    TWITTER_GREY,
    LINKEDIN_GREY,
    DISCORD_GREY,
  ];

  const [windowSize, setWindowSize] = useState<any>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const IconComponent = (props: { icons: string[] }) => {
    const { icons } = props;

    return (
      <div className={styles.flexStyle}>
        {icons.map((item: string, index: number) => (
          <div>
            <img
              key={index}
              src={item}
              alt={`icon-${index}`}
              width={windowSize >= 1023 ? "30px" : "20px"}
              style={{
                marginRight:
                  index !== icons.length - 1
                    ? windowSize >= 1023
                      ? "40px"
                      : "20px"
                    : "0",
              }}
              // className={styles.flexStyle}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.layoutContainer}>
      <div>
        {windowSize <= 1023 ? (
          <div className={styles.leftContainerForMobile}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                <img src={BASE_LOGO_WHITE} width="20px" height="20px" />
              </div>
              <h4 className={styles.textForLogo}>Base</h4>
            </div>
          </div>
        ) : (
          <div className={styles.leftContainerForWindow}>
            <div>
              <img src={BASE_LOGO_WHITE_WINDOW} width="60px" />
            </div>
            <div className={styles.flexStyle}>
              <h3 className={styles.baseTextStyle}>BASE</h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <IconComponent icons={socialNetworkWhite} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightSubContainer}>
          <div>
            <div>
              <Outlet />
              {children}
            </div>
            <div>
              <div className={styles.bottomContainer}>
                <h5
                  className={`${styles.textStyleForBottomText} ${styles.marginRightBottomStyleWindow}`}
                >
                  Don’t have an account?{" "}
                </h5>
                <h5
                  className={styles.textStyleForBottomText}
                  style={{ color: "#346BD4", cursor: "pointer" }}
                >
                  Register here
                </h5>
              </div>
              {windowSize <= 1023 ? (
                <div
                  className={styles.flexStyle}
                  style={{ paddingBottom: "20px" }}
                >
                  <IconComponent icons={socialNetworkGrey} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
