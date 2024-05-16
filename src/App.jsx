import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";




function App() {
  

  return (
    <main className="h-screen w-screen">
     <BrowserRouter>
     <Routes>
      <Route index element = {<Home/>}/>
      <Route path="/admin" Component={Login}/>
      
     </Routes>
     </BrowserRouter>
    </main>
  );
}

export default App;
