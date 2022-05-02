import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import DogContainer from "./components/Dog/DogContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainContainer from "./components/Main/MainContainer";
import Loader from "./components/common/Loader/Loader";
import notFoundImg from './assets/img/nofound.jpg'
import Modal from "./components/common/Modal/Modal";

const FavoriteContainer = React.lazy(() => import('./components/Favorite/FavoriteContainer'));


const App = (props) => {

    let[errorStatus, setErrorStatus] = useState(false);

    useEffect( () => {
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
        return function cleanup() {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }
    },[errorStatus]);


    const catchAllUnhandledErrors = (promiseRejectionEvent) => {
        setErrorStatus(true)
        setTimeout(() => {
            setErrorStatus(false)
        }, 5000);
    }

    return (
        <BrowserRouter>
            <div>
                {errorStatus && <Modal title={"Ошибка в соединении сервера!"} message={"Мы постораемся исправить ошибку в ближаешее время..."}/>}
                <Header/>
                <Switch>
                    <Route exact path='/' render={() => <MainContainer store={props.store}/>}/>
                    <Route path='/dog/:dogId' render={() => <DogContainer store={props.store}/>}/>
                    <Route path='/favorite' render={() => {
                        return <Suspense fallback={<div><Loader/></div>}>
                            <FavoriteContainer state={props.store}/>
                        </Suspense>
                    }}/>
                    <Route exact path='*' render={() => <div className="error404"><img src={notFoundImg} /></div>}/>
                </Switch>

            </div>
        </BrowserRouter>
    );
}


export default App;
