import './App.css'
import { Routes, Route } from "react-router";
import { Drawing ,Home} from "./component/pages";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="drawing" element={<Drawing />} />
    </Routes>
  )
}

export default App
