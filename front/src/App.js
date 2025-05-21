
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Submit } from './components/pages/Submit';
// import { Result} from './components/pages/Result';
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { LoginFailed } from "./components/pages/LoginFailed";
import { Register } from "./components/pages/Register";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Submit />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-failed" element={<LoginFailed />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/result" element={<Result />} /> */}
      </Routes>
    </>
  );
}

export default App;
