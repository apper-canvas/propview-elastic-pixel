import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import BrowseProperties from "@/components/pages/BrowseProperties"
import PropertyDetails from "@/components/pages/PropertyDetails"
import MapView from "@/components/pages/MapView"
import SavedProperties from "@/components/pages/SavedProperties"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<BrowseProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/saved" element={<SavedProperties />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App