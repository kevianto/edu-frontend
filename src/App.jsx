import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import ManageBlogs from "./pages/Manageblogs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/manageblogs" element={<ManageBlogs/>} />
      </Routes>
    </Router>
  );
}

export default App;
