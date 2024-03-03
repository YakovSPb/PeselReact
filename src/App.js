import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import notFoundImg from './assets/img/nofound.jpg'
import Home from "./pages/Home/Home";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' render={() => <Home />}/>
                    <Route exact path='*' render={() => <div className="error404"><img src={notFoundImg} /></div>}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}


export default App;
