import { useRef } from "react";
import { FixedSizeList as List } from "react-window";
import useQueryStore from "../store";
import "../styles/QueryOutput.css";

const ROW_HEIGHT = 40;

const QueryOutput = () => {
  const { queryResult } = useQueryStore();
  const listRef = useRef();

  const exportToCSV = () => {
    if (!queryResult || queryResult.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = Object.keys(queryResult[0]).join(",");
    const rows = queryResult
      .map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "query_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Row = ({ index, style }) => {
    const row = queryResult[index];
    return (
      <div className="virtual-row" style={style}>
        {Object.values(row).map((value, i) => (
  <div className="virtual-cell" key={i} title={value}>
    {value}
  </div>
))}

      </div>
    );
  };

  return (
    <div className="output-container">
      <div className="output-header">
        <h3 className="output-title">Query Output</h3>
        <button onClick={exportToCSV} className="export-btn">
          Export CSV
        </button>
      </div>

      {queryResult.length > 0 && (
        <p className="execution-time">Execution Time: 0.05ms</p>
      )}

      {queryResult.length > 0 ? (
        <div className="query-table-container">
          <div className="table-header">
            {Object.keys(queryResult[0]).map((key) => (
              <div className="header-cell" key={key}>
                {key}
              </div>
            ))}
          </div>
          <List
            height={400}
            itemCount={queryResult.length}
            itemSize={ROW_HEIGHT}
            width="100%"
            ref={listRef}
          >
            {Row}
          </List>
        </div>
      ) : (
        <p className="no-data">
          No data available. Run a Predefined query to see the output.
        </p>
      )}
    </div>
  );
};

export default QueryOutput;
