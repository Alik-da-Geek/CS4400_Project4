import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
// @ts-ignore
import CreateCorp from "./screens/create_corp.tsx";
// @ts-ignore
import CreateBank from "./screens/create_bank.tsx";
// @ts-ignore
import Home from "./screens/home.tsx";
// @ts-ignore
import CreateEmployee from "./screens/create_employee.tsx";
// @ts-ignore
import Login from "./screens/login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-ignore
import DisplayAccountStats from "./screens/display_account_stats.tsx";
// @ts-ignore
import DisplayCorporationStats from "./screens/display_corporation_stats.tsx";
// @ts-ignore
import { CreateCustomer } from "./screens/create_customer.tsx";
// @ts-ignore
import { StopCustomer } from "./screens/stop_customer.tsx";
// @ts-ignore
import { StopEmployee } from "./screens/stop_employee.tsx";
// @ts-ignore
import DisplayCustomerStats from "./screens/display_customer_stats.tsx";
// @ts-ignore
import DisplayBankStats from "./screens/display_bank_stats.tsx";
// @ts-ignore
import DisplayEmployeeStats from "./screens/display_employee_stats.tsx";


const rootElement = document.getElementById("root");
ReactDOM.render(
    <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="create_corp" element={<CreateCorp />}></Route>
                <Route path="create_bank" element={<CreateBank />}></Route>
                <Route path="create_employee" element={<CreateEmployee />}></Route>
                <Route path="create_customer" element={<CreateCustomer />}></Route>
                <Route path="stop_employee" element={<StopEmployee />}></Route>
                <Route path="stop_customer" element={<StopCustomer />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="display_account_stats" element={<DisplayAccountStats />}></Route>
                <Route path="display_bank_stats" element={<DisplayBankStats />}></Route>
                <Route path="display_corporation_stats" element={<DisplayCorporationStats />}></Route>
                <Route path="display_customer_stats" element={<DisplayCustomerStats />}></Route>
                <Route path="display_employee_stats" element={<DisplayEmployeeStats />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    , rootElement);
