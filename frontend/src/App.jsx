import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles/App.css'
import Header from "./components/Header"
import Home from "./pages/Home"
import Downlink from "./pages/Downlink"


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/downlink" element={<Downlink />} />
          <Route path="*" element={<p>404. Page you're looking for can't be found. </p>} />
        </Routes>
        <div class="footer"/>
      </BrowserRouter>
    </>
  )
}

export default App
