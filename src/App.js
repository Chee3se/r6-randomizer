import React from 'react';
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";

export default function App() {
    return (
        <div className="App bg-image">
            <Navbar/>
            <Main/>
        </div>
    );
}