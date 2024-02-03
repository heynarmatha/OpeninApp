import React, { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import axios from "axios";

//assets and images
import { EXCEL_ICON, UPLOAD_ICON } from "../../assets/Images";
import { ReactComponent as YourSvg } from "../../assets/Images/close.svg";
import styles from "./style.module.scss";

//components
import useDragAndDrop from "./hooks/useDragAndDrop";
import Loader from "../../components/Loader/loader";
import TableComponent from "../../components/TableComponent/table";
import Dropdown from "../../components/Dropdown/dropdown";

function UploadCSVScreen() {
  const {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  } = useDragAndDrop();

  const [file, setFile] = useState<File>();
  const [fileKey, setFileKey] = useState(0);
  const [fileChanges, setFileChanges] = useState<Boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [loader, setLoader] = useState<Boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [tagData, setTagData] = useState<any>([]);

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

  useEffect(() => {
    console.log("file", file);
  }, [fileChanges]);

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    const selectedFile: any = e?.dataTransfer?.files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (fileExtension !== "csv") {
      return setFileDropError("Please provide a proper CSV file");
    }
    setFileDropError("");
    setFileChanges(true);
    setFile(selectedFile);
  };

  const fileSelect = (e: any) => {
    let selectedFile = e?.target.files;
    setFileChanges(true);
    const fileExtension = selectedFile[0].name.split(".").pop().toLowerCase();
    if (fileExtension !== "csv") {
      return setFileDropError("Please Upload CSV file");
    }
    setFile(selectedFile[0]);
    setFileKey((prevKey) => prevKey + 1);
    setFileDropError("");
  };

  const removeFile = () => {
    setFile(undefined);
    setFileKey((prevKey) => prevKey + 1);
  };

  const handleFileUpload = async (file: any) => {
    if (file) {
      const response = await axios.get(URL.createObjectURL(file));
      const parsedData: any = Papa.parse(response.data, {
        header: true,
        transformHeader: (header: any) => header.replace(/\s+/g, ""),
      }); // Remove spaces from header });
      if (parsedData && parsedData.data) {
        setCsvData(parsedData.data);
      }
      setLoader(false);
      setIsButtonDisabled(true);
      removeFile();
    }
  };

  const onUploadFile = () => {
    if (file?.name) {
      setFileDropError("");
      setLoader(true);
      setTimeout(() => {
        handleFileUpload(file);
      }, 3000);
    } else {
      setFileDropError("Please Upload CSV file");
    }
  };

  const onSelectedTags = (selectedTag: any, row: any, index: number) => {
    console.log("selectedTag", selectedTag);

    // Ensure that "selectedtags" is initialized as an array
    const selectedTagsArray = row["selectedtags"] || [];

    // Check if the selected tag is not already in the array
    if (!selectedTagsArray.some((tag: any) => tag.name === selectedTag.name)) {
      // Update the state or data with the new selected tag
      setCsvData((prevData: any) => {
        const newData = [...prevData];

        // Ensure that the row at the given index exists and has "selectedtags" property
        if (newData[index]) {
          newData[index]["selectedtags"] = [...selectedTagsArray, selectedTag];
        }

        return newData;
      });
    } else {
      // Log or handle the case when the tag is already selected
      console.log("Tag already selected");
    }
  };

  const onClickForRemoveTag = (tagToRemove: any, rowIndex: any) => {
    setCsvData((prevData) => {
      const newData: any = [...prevData];

      if (newData[rowIndex] && newData[rowIndex]["selectedtags"]) {
        // Filter out the tag to be removed from selectedtags array
        newData[rowIndex]["selectedtags"] = newData[rowIndex][
          "selectedtags"
        ].filter((tag: any) => tag.name !== tagToRemove.name);
      }

      return newData;
    });
  };

  const columns = [
    {
      title: "Sl No.",
      dataIndex: "id",
      key: "id",
      renderHeader: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
      render: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
    },
    {
      title: "Links",
      dataIndex: "links",
      key: "links",
      renderHeader: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
      render: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
      renderHeader: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
      render: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
    },
    {
      title: "Add Tags",
      dataIndex: "selecttags",
      key: "selecttags",
      renderHeader: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
      render: (title: string, row: any, index: number) => {
        // console.log("title", title);
        const string = title;
        const categories = string
          .split(",")
          .map((category) => ({ name: category }));
        return (
          <div>
            <Dropdown
              options={categories}
              onSelect={(selectedTag: any) =>
                onSelectedTags(selectedTag, row, index)
              }
              placeholdertext={"Select Tags"}
              optionKey="name"
            />
          </div>
        );
      },
    },
    {
      title: "Selected Tags",
      dataIndex: "selectedtags",
      key: "selectedtags",
      renderHeader: (title: string, row: any, index: number) => {
        return <div>{title}</div>;
      },
      render: (title: any, row: any, index: number) => {
        console.log("title for selectedtags", title, row);
        return (
          <div className={styles.selectedTagMainContainer}>
            {title.length > 0 &&
              title?.map((item: any) => {
                return (
                  <div className={styles.selectedTabSingleContainer}>
                    <h6>{item?.name}</h6>
                    <div
                      className={styles.iconForTag}
                      onClick={() => onClickForRemoveTag(item, index)}
                    >
                      <YourSvg />
                    </div>
                  </div>
                );
              })}
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.containerForUpload}>
      <div className={styles.subContainer}>
        {windowSize <= 1023 && (
          <h5 className={styles.uploadText}>Upload CSV</h5>
        )}

        <div className={styles.uploadMainContainer}>
          <div
            className={styles.uploadContainer}
            style={{
              border: `${dragOver ? "2px dashed yellowgreen" : ""}`,
            }}
          >
            <form
              className={styles.flex_style}
              style={{ flexDirection: "column" }}
            >
              {fileDropError && (
                <div className={styles.file_drop_error}>{fileDropError}</div>
              )}
              <label
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={(e) => onDrop(e)}
              >
                <div
                  className={`${styles.flex_style} ${styles.excel_icon_container}`}
                >
                  <img src={EXCEL_ICON} alt="excel icon" />
                </div>

                <div
                  className={styles.flex_style}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {file?.name ? (
                    <h5
                      className={styles.afterUploadText}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {file.name}
                    </h5>
                  ) : (
                    <h5
                      className={styles.dropYourExcelText}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {windowSize <= 1023
                        ? "Upload your excel sheet"
                        : " Drop your excel sheet here or"}

                      <label htmlFor="file">
                        <h5 className={styles.browseText}>
                          {windowSize <= 1023 ? "here" : "browse"}
                        </h5>
                      </label>
                    </h5>
                  )}
                </div>

                <input
                  type="file"
                  name="file"
                  id="file"
                  key={fileKey}
                  onChange={(e) => fileSelect(e)}
                  ref={fileInputRef}
                />
              </label>

              {file?.name && (
                <div
                  onClick={() => removeFile()}
                  className={styles.flex_style}
                  style={{ marginTop: "30px" }}
                >
                  <h5 className={styles.removeText}>Remove</h5>
                </div>
              )}
            </form>
          </div>
          <button
            className={`${styles.uploadBtnContainer} ${styles.flex_style}`}
            disabled={isButtonDisabled}
            style={{ opacity: isButtonDisabled ? 0.6 : 1 }}
            onClick={onUploadFile}
          >
            {loader ? (
              <div>{loader && <Loader />}</div>
            ) : (
              <div className={styles.flex_style}>
                <div>
                  <img src={UPLOAD_ICON} style={{ marginRight: "8px" }} />
                </div>
                <div className={styles.uploadTextBtn}>Upload</div>
              </div>
            )}
          </button>
        </div>
      </div>
      {csvData && csvData?.length > 0 && (
        <div className={styles.uploadTableHeaderContainer}>
          <h5 className={styles.uploadTableHeaderText}>Uploads</h5>
        </div>
      )}

      {csvData && csvData?.length > 0 && (
        <div className={styles.tableContainer}>
          <TableComponent dataSource={csvData} columns={columns} />
        </div>
      )}
    </div>
  );
}

export default UploadCSVScreen;
