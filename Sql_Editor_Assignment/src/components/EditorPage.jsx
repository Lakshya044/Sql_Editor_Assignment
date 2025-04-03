import React, { useEffect } from "react";
import MonacoEditor from "./MonacoEditor";
import EditorPanel from "./EditorPanel";
import Sidebar from "./Sidebar";
import QueryOutput from "./QueryOutput";
import useQueryStore from "../store";
import "../styles/EditorPage.css"; 

const EditorPage = () => {
  const { currentQuery, queryHistory, queryResult, setQuery, executeQuery, saveQuery, clearQuery } = useQueryStore();

  const predefinedQueries = [
    "SELECT * FROM networkData;",
    "SELECT id, first_name, email and ip_address FROM networkData;",
    "SELECT * FROM personalDatabase;",
    "SELECT * FROM accountDatabase;",
    "SELECT account_id, username, password, phone_number FROM accountDatabase;",
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case "r": 
            event.preventDefault();
            executeQuery();
            break;
          case "s": 
            event.preventDefault();
            saveQuery();
            break;
          case "l": 
            event.preventDefault();
            clearQuery();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [executeQuery, saveQuery, clearQuery]);

  return (
    <div className="editor-page">
      <Sidebar queries={predefinedQueries} history={queryHistory} onSelectQuery={setQuery} />

      <div className="editor-container">
        {/* <div className="editor-output-wrapper"> */}
          <div className="editor-section">
            <MonacoEditor query={currentQuery} setQuery={setQuery} />
            <div className="editor-panel-wrapper">
              <EditorPanel executeQuery={executeQuery} saveQuery={saveQuery} clearQuery={clearQuery} />
            </div>
          </div>

          <div className="query-output-section">
            <QueryOutput queryResult={queryResult} />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditorPage;
