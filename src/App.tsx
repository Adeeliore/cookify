import './index.sass'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ReactDOM from 'react-dom';
import RecipesPage from "./pages/RecipesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyBookPage from "./pages/MyBookPage";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecipesPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/my-book" element={<MyBookPage/>} />
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
