import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Dogs from "./components/Dogs";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

const App = () => {
    return (
        <div>
            <Header/>
            <Nav />
            <Dogs />
            <Footer />
        </div>
    );
}


export default App;
