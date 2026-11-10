import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'
import { Categories } from './Components/Categories.jsx'
import Bookride from './Components/Bookride.jsx'
import Enquiry from './Components/Enquiry.jsx'
import Gallery from './Components/Gallery.jsx'
import { Header } from './Components/Header.jsx'
import BMWM from './Components/BMWM.jsx'
import BMWI from './Components/BMWI.jsx'
import XModels from './Components/XModels.jsx'
import CoupesC from './Components/CoupesC.jsx'
import SedansGC from './Components/SedansGC.jsx'


export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bookride" element={<Bookride />} />
        <Route path="/BMWM" element={<BMWM />} />
        <Route path="/BMWElectric" element={<BMWI />} />
        <Route path="/XModels" element={<XModels />} />
        <Route path="/CoupesC" element={<CoupesC />} />
        <Route path="/SedansGC" element={<SedansGC />} />
      </Routes>
    </>

  )
}
