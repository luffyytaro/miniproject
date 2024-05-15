import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { login } from "../server/handlers/user.handler";



function App() {
  

  return (
    <main className="h-screen w-screen">
     <BrowserRouter>
     <Routes>
      <Route index element = {<Home/>}/>
      <Route path="/admin" Component={login}/>
      
     </Routes>
     </BrowserRouter>
    </main>
  );
}

export default App;
