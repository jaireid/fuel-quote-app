import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Profile from './components/Profile/Profile.jsx';
import Quote from './components/Quote/Quote.jsx';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="page">
        <Profile />
      </div>
    </div>
  )
}

export default App
