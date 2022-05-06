 
import './App.css';
 
import SignIn from './/component/SignIn.js';
import SignUp from './component/SignUp.js';
import Dashboard  from './component/Dashboard';
import { AuthProvider } from './context/AuthContext';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom' 

function App() {
  return (
 
    <Router>
 <AuthProvider>
         <Routes>
         <Route exact path="/" element={<Dashboard/>} />
            <Route exact path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
         </Routes>
      </AuthProvider>
    </Router>
     
  )
    
}

export default App;
