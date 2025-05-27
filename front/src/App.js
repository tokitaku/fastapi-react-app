
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Submit } from './components/pages/Submit';
// import { Result} from './components/pages/Result';
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { LoginFailed } from "./components/pages/LoginFailed";
import { Register } from "./components/pages/Register";
import { LoginUserProvider } from "./components/providers/LoginUserProvider";
import { Footer } from "./components/templates/Footer";
import { RegisterSucceeded } from "./components/pages/RegisterSucceeded";
import { RegisterFailed } from "./components/pages/RegisterFailed";
import { NotFound } from "./components/pages/NotFound";

function App() {
  return (
    <LoginUserProvider>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Submit />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-failed" element={<LoginFailed />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/result" element={<Result />} /> */}
          <Route path="/register-succeeded" element={<RegisterSucceeded />} />
          <Route path="/register-failed" element={<RegisterFailed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </LoginUserProvider>
  );
}

export default App;
