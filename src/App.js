import "./App.css";
import React from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import Forgot from "./Components/Login/Forgot"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./Context/StateProvider";
import { auth } from "./firebase";

function App() {
  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
    }
  })
  },[dispatch])
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
