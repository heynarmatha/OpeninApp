import styles from "./style.module.scss";

interface columnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (title: string, row: any, index: number) => void;
  renderHeader?: (title: string, row: any, index: number) => void;
}
interface propsType {
  columns: columnType[];
  dataSource: any[];
}

const TableComponent = ({ dataSource, columns }: propsType) => {
  return (
    <div className={styles.mainContainer}>
      <table className={styles.customTableContainer}>
        <thead>
          <tr>
            {columns.map((column: columnType, index: number) => (
              <th key={index}>
                {column?.renderHeader?.(column?.title, column, index) ??
                  column?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item: any, index: number) => (
            <tr key={index}>
              {columns.map((column: columnType, columnIndex: number) => (
                <td key={columnIndex}>
                  {column?.render?.(item?.[column?.dataIndex], item, index) ??
                    item?.[column?.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
