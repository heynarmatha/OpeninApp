import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//assets and images
import {
  CALENDER,
  DASHBOARD,
  INVOICE,
  LOGO_BASE_VIOLENT,
  NOTIFICATION,
  NOTIFICATION_SIDEBAR,
  PROFILE_IMAGE,
  SCHEDULE,
  SETTING,
  TOGGLE_BUTTON,
  UPLOAD,
} from "../../assets/Images";
import { PRIVATE_ROUTE_URL } from "../../routes/variable";
import styles from "./style.module.scss";

//components
import Modal from "../Modal/modal";
interface SidebarItem {
  title: string;
  icon?: string;
  navigateItem?: any;
  id?: number;
  headerTitle?: string;
}

const AppLayoutForMainScreen = ({ children }: any) => {
  const navigate = useNavigate();
  const sideBarList = [
    {
      title: "Dashboard",
      icon: DASHBOARD,
      navigateItem: "",
      id: 1,
      headerTitle: "Dashboard",
    },
    {
      title: "Upload",
      icon: UPLOAD,
      navigateItem: PRIVATE_ROUTE_URL.upload,
      id: 2,
      headerTitle: "Upload CSV",
    },
    {
      title: "Invoice",
      icon: INVOICE,
      navigateItem: "",
      id: 3,
      headerTitle: "Invoice",
    },
    {
      title: "Schedule",
      icon: SCHEDULE,
      navigateItem: "",
      id: 4,
      headerTitle: "Schedule",
    },
    {
      title: "Calendar",
      icon: CALENDER,
      navigateItem: "",
      id: 5,
      headerTitle: "Calendar",
    },
    {
      title: "Notification",
      icon: NOTIFICATION_SIDEBAR,
      navigateItem: "",
      id: 6,
      headerTitle: "Notification",
    },
    {
      title: "Settings",
      icon: SETTING,
      navigateItem: "",
      id: 7,
      headerTitle: "Settings",
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [headerTitle, setHeaderTitle] = useState("Upload CSV");
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const cancelIconForConfirm = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClickSideBarItem = (item: any) => {
    if (item?.navigateItem === "") {
      return console.log("test");
    } else {
      setActiveItem(item?.id);
      navigate(item?.navigateItem);
      setHeaderTitle(item?.headerTitle);
    }
  };

  const SideBarListComponent = (props: {
    sideBarList: SidebarItem[];
    onclickSideBar?: any;
  }) => {
    const { sideBarList, onclickSideBar } = props;
    return (
      <div className={styles.SideBarListContainer}>
        {sideBarList?.map((item: SidebarItem, index: number) => {
          return (
            <div
              style={{
                background:
                  item?.id === activeItem
                    ? "linear-gradient(96deg, rgba(96,91,255,1) 0%, rgba(172,169,255,1) 0%, rgba(184,182,255,1) 0%, rgba(195,193,255,1) 0%, rgba(218,216,255,1) 3%, rgba(229,228,255,1) 12%, rgba(255,255,255,1) 19%)"
                    : "unset",
              }}
              onClick={onclickSideBar}
            >
              <div
                onClick={() => onClickSideBarItem(item)}
                className={styles.SideBarListSubContainer}
              >
                <div className={styles.flexStyle}>
                  <img
                    src={item?.icon}
                    className={styles.sideBarIcon}
                    alt="icon"
                  />
                </div>
                <div>
                  <h4
                    className={styles.sideBarListText}
                    style={{
                      color: item?.id === activeItem ? "#605BFF" : "#9a9aa9",
                    }}
                  >
                    {item?.title}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.sideNavBarContainer}>
        <div
          className={styles.logoAndTextContainer}
          style={{ justifyContent: "center", padding: "30px 0" }}
        >
          <div className={styles.flexStyle}>
            <img
              src={LOGO_BASE_VIOLENT}
              alt="logo"
              // width="20px"
              style={{ marginRight: "15px" }}
            />
          </div>
          <div>
            <h5 className={styles.baseText}>Base</h5>
          </div>
        </div>
        <SideBarListComponent sideBarList={sideBarList} />
      </div>
      <div className={styles.mainContainer}>
        <div>
          <div className={styles.headerContainer}>
            <div className={styles.headerSubContainer}>
              <div className={styles.flexStyle} style={{ width: "50%" }}>
                <div
                  className={`${styles.toggle_button}`}
                  onClick={toggleSidebar}
                >
                  <img
                    src={TOGGLE_BUTTON}
                    alt="TOGGLE_BUTTON"
                    // width="20px"
                    style={{ marginRight: "15px" }}
                  />
                </div>
                <div
                  className={`${styles.logoAndTextContainer} ${styles.logoAndTextHiddenContainer}`}
                >
                  <div className={styles.flexStyle}>
                    <img
                      src={LOGO_BASE_VIOLENT}
                      alt="logo"
                      // width="20px"
                      style={{ marginRight: "10px" }}
                    />
                  </div>
                  <div>
                    <h5 className={styles.baseText}>Base</h5>
                  </div>
                </div>

                <h5 className={styles.headerTitleTextStyle}>
                  {headerTitle || ""}
                </h5>
              </div>
              <div
                className={styles.flexStyle}
                style={{ width: "50%", justifyContent: "flex-end" }}
              >
                <div>
                  <img
                    src={NOTIFICATION}
                    alt="notification"
                    // width="20px"
                    style={{ marginRight: "25px" }}
                  />
                </div>
                <div>
                  <img
                    src={PROFILE_IMAGE}
                    alt="profile_image"
                    //  width="25px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.childrenContainer}>
            <Outlet />
            {children}
          </div>
        </div>
      </div>
      {isSidebarOpen && windowSize < 1024 && (
        <Modal isOpen={isSidebarOpen} onCancel={cancelIconForConfirm}>
          <div
            className={styles.logoAndTextContainer}
            style={{ padding: "0 20px" }}
          >
            <div className={styles.flexStyle}>
              <img
                src={LOGO_BASE_VIOLENT}
                alt="logo"
                // width="20px"
                style={{ marginRight: "10px" }}
              />
            </div>
            <div>
              <h5 className={styles.baseText}>Base</h5>
            </div>
          </div>
          <div style={{ marginTop: "35px" }}>
            <SideBarListComponent
              sideBarList={sideBarList}
              onclickSideBar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AppLayoutForMainScreen;
