import './App.css';
import React from 'react'
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {


    return (

                <div className = {'main'}>
                    <h2 className = "main-header">React Crud Operations</h2>

                    <div>
                        <BrowserRouter>
                            <Routes>
                                <Route path={"/create"} element={<Create/>}></Route>
                            </Routes>
                            <Routes>
                                <Route path={"/read"} element={<Read/>}></Route>
                            </Routes>
                            <Routes>
                                <Route path={"/update"} element={<Update/>}></Route>
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>


    );
}

export default App;
