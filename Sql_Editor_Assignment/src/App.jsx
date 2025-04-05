import React, { lazy, Suspense } from "react";

const Navbar = lazy(() => import("./components/Navbar"));
const EditorPage = lazy(() => import("./components/EditorPage"));

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading App...</div>}>
      <div>
        <Navbar />
        <EditorPage />
      </div>
    </Suspense>
  );
}

export default App;
