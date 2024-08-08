import React from 'react';
import logo from './logo.svg';
import './App.css';
import FancyForm from "./components/fancy-form";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="bg-[#151A29] h-[100svh] w-[100svw] flex justify-center items-center">
            <FancyForm />
            <Toaster />
        </div>
    );
}

export default App;
