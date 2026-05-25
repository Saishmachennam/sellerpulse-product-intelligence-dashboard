import Navbar from "./components/Navbar";

import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Issues from "./pages/Issues";
import Alerts from "./pages/Alerts";
import CompetitorPrices from "./pages/CompetitorPrices";
import PriceAnalysis from "./pages/PriceAnalysis";
import AIEnhancement from "./pages/AIEnhancement";
import VideoUpload from "./pages/VideoUpload";
import Jobs from "./pages/Jobs";

function App() {

  return (

    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "100vh"
      }}
    >

      <Navbar />

      <VideoUpload />

      <Upload />

      <Dashboard />

      <Products />

      <Jobs />

      <AIEnhancement />

      <Issues />

      <Alerts />

      <CompetitorPrices />

      <PriceAnalysis />

      

    </div>
  );
}

export default App;