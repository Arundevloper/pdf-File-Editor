import './App.css';
import Navbar from './components/navbar.component';
import Login from './components/login.component';
import RegistrationForm from './components/register.component';
import DynamicTable from './components/table.component';
import PageSelector from './components/extract.component';

function App() {
  return (
    <>
      <Navbar />
      <Login/>
    </>
  );
}

export default App;
