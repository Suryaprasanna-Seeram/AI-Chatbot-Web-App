import { useState } from "react";
import { useSelector } from "react-redux";
import ChatBox from "./components/ChatBox"
import Login from './components/Login'
import Register from "./components/Register";


function App() {

const token = localStorage.getItem("token")
 const user = useSelector((state) => state.auth.user);
 const [isRegister, setIsRegister] = useState(false);

 if (!token || !user) {
    return isRegister ? (
      <Register onSwitch={() => setIsRegister(false)} />
    ) : (
      <Login onSwitch={() => setIsRegister(true)} />
    );
  }
  return (
    <>
     <ChatBox token={token}/>
    </>
  )
}

export default App
