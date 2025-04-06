import React, { useState, useEffect } from "react";
import { FaCloud, FaStar } from "react-icons/fa";
import useQueryStore from "../store";
import "../styles/Sidebar.css";

const Sidebar = ({ queries = [], onSelectQuery }) => {
  const {
    searchQueries,
    bookmarks,
    addBookmark,
    removeBookmark,
  } = useQueryStore();

  const [searchQuery, setSearchQueryInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredQueries =  searchQueries.filter((query) =>
    query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`sidebar ${isMobile ? "sidebar-mobile" : "sidebar-desktop"}`}>
      <div className="sections-wrapper">
        {/* Available Queries */}
        <div className="section">
          <h2>
            <FaCloud className="icon" /> Queries Available
          </h2>
          <input
            type="text"
            placeholder="Search queries..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQueryInput(e.target.value)}
          />
          <ul>
            {filteredQueries.map((query, index) => (
              <li key={index} className="query-item">
                <span onClick={() => onSelectQuery(query)}>{query}</span>
                <button
                  className="bookmark-btn"
                  onClick={() => addBookmark(query)}
                  title="Bookmark this query"
                >
                  ★
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bookmarked Queries */}
        <div className="section">
          <h2>
            <FaStar className="icon" /> Bookmarked Queries
          </h2>
          <ul>
            {bookmarks.length === 0 && <p className="no-data">No bookmarks yet</p>}
            {bookmarks.map((query, index) => (
              <li key={index} className="query-item">
                <span onClick={() => onSelectQuery(query)}>{query}</span>
                <button
                  className="bookmark-btn"
                  onClick={() => removeBookmark(query)}
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
