import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './Login'

// import Li from './li'
import "./App.css"
import Register from './Register';
import PropUpload from './propertyUpload';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/propertyUpload" element={<PropUpload/>}/>
    </Routes>
    </BrowserRouter>
  //  <main className='App'>
  //   <Register />
  //  </main>
  );
}

export default App;
