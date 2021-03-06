import React from "react";
import "./styles/main.css";
import * as ReactDOMClient from 'react-dom/client';

// @ts-ignore
import CreateCorp from "./screens/create_corp.tsx";
// @ts-ignore
import CreateBank from "./screens/create_bank.tsx";
// @ts-ignore
import Home from "./screens/home.tsx";
// @ts-ignore
import CreateEmployee from "./screens/create_employee.tsx";
// @ts-ignore
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
import { HireWorker } from "./screens/hire_worker.tsx";
// @ts-ignore
import DisplayCustomerStats from "./screens/display_customer_stats.tsx";
// @ts-ignore
import DisplayBankStats from "./screens/display_bank_stats.tsx";
// @ts-ignore
import DisplayEmployeeStats from "./screens/display_employee_stats.tsx";
// @ts-ignore
import { ReplaceManager } from "./screens/replace_manager.tsx";
// @ts-ignore
import { CreateFee } from "./screens/create_fee.tsx";
// @ts-ignore
import { PayEmployees } from "./screens/pay_employee.tsx";
// @ts-ignore
import { MakeDeposit } from "./screens/make_deposit.tsx";
// @ts-ignore
import { MakeWithdrawal } from "./screens/make_withdrawal.tsx";
// @ts-ignore
import { MakeTransfer } from "./screens/make_transfer.tsx";
//@ts-ignore
import { ManagerOverdraft } from "./screens/manage_overdraft.tsx";
//@ts-ignore
import { ManageAccountAccess } from "./screens/manage_account_access.tsx";
//@ts-ignore
import { ManageAccount } from "./screens/manage_account.tsx";
const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
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
                <Route path="hire_worker" element={<HireWorker />}></Route>
                <Route path="replace_manager" element={<ReplaceManager />}></Route>
                <Route path="create_fee" element={<CreateFee />}></Route>
                <Route path="pay_employees" element={<PayEmployees />}></Route>
                <Route path="make_deposit" element={<MakeDeposit />}></Route>
                <Route path="make_withdrawal" element={<MakeWithdrawal />}></Route>
                <Route path="make_transfer" element={<MakeTransfer />}></Route>
                <Route path="manage_account_access" element={<ManageAccountAccess />}></Route>
                <Route path="manage_account" element={<ManageAccount />}></Route>
                <Route path="manage_overdraft" element={<ManagerOverdraft />}></Route>
                <Route path="display_account_stats" element={<DisplayAccountStats />}></Route>
                <Route path="display_bank_stats" element={<DisplayBankStats />}></Route>
                <Route path="display_corporation_stats" element={<DisplayCorporationStats />}></Route>
                <Route path="display_customer_stats" element={<DisplayCustomerStats />}></Route>
                <Route path="display_employee_stats" element={<DisplayEmployeeStats />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
);
