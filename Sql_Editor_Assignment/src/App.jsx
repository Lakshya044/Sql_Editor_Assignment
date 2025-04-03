import React,{lazy, } from 'react'

const Navbar = lazy(() => import("./components/Navbar"));
const EditorPage = lazy(() => import("./components/EditorPage"));
function App() {
  return (
    <div>
      <Navbar/>
      <EditorPage/>
    </div>
  )
}

export default App
