import React from "react";

import NavigationBar from "./Components/NavigationBar";

import Footer from "./Components/Footer";
import { AppRoutes } from "./AppRoutes";


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <AppRoutes/>
      <Footer />
    </div>
  );
}

export default App;
