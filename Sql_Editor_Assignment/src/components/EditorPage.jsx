import React, { useEffect, lazy, Suspense } from "react";
import useQueryStore from "../store";
import "../styles/EditorPage.css";

// Lazy load components
const MonacoEditor = lazy(() => import("./MonacoEditor"));
const EditorPanel = lazy(() => import("./EditorPanel"));
const Sidebar = lazy(() => import("./Sidebar"));
const QueryOutput = lazy(() => import("./QueryOutput"));

const EditorPage = () => {
  const {
    currentQuery,
    queryHistory,
    queryResult,
    setQuery,
    executeQuery,
    saveQuery,
    clearQuery,
  } = useQueryStore();

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
      <Suspense fallback={<div className="loader">Loading Sidebar...</div>}>
        <Sidebar
          queries={predefinedQueries}
          history={queryHistory}
          onSelectQuery={setQuery}
        />
      </Suspense>

      <div className="editor-container">
        <div className="editor-section">
          <Suspense fallback={<div className="loader">Loading Editor...</div>}>
            <MonacoEditor query={currentQuery} setQuery={setQuery} />
          </Suspense>

          <div className="editor-panel-wrapper">
            <Suspense fallback={<div className="loader">Loading Panel...</div>}>
              <EditorPanel
                executeQuery={executeQuery}
                saveQuery={saveQuery}
                clearQuery={clearQuery}
              />
            </Suspense>
          </div>
        </div>

        <div className="query-output-section">
          <Suspense fallback={<div className="loader">Loading Output...</div>}>
            <QueryOutput queryResult={queryResult} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
