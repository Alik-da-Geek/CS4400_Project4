import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
// @ts-ignore
import CreateCorp from "./screens/create_corp.tsx";
import CreateBank from "./screens/create_bank.tsx";
// @ts-ignore
import Home from "./screens/home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const rootElement = document.getElementById("root");
ReactDOM.render(
    <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="create_corp" element={<CreateCorp />}></Route>
                <Route path="create_bank" element={<CreateBank />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    , rootElement);
