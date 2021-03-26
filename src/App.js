import React, {Suspense} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import DogContainer from "./components/Dog/DogContainer";
import {BrowserRouter, Route} from "react-router-dom";
import MainContainer from "./components/Main/MainContainer";
import Loader from "./components/Loader/Loader";
const FavoriteContainer = React.lazy(() => import('./components/Favorite/FavoriteContainer'));


const App = (props) => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path='/' render={() => <MainContainer store={props.store}/>}/>
                <Route path='/dog/:dogId' render={() => <DogContainer store={props.store}/>}/>
                <Route path='/favorite' render={() => {
                    return <Suspense fallback={<div><Loader /></div>}>
                        <FavoriteContainer state={props.store}/>
                    </Suspense>
                }}/>


            </div>
        </BrowserRouter>
    );
}


export default App;
