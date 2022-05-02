export interface HomeState {
    username: string,
    password: string,
    loggedIn: boolean,
    admin: boolean,
    manager: boolean,
    customer: boolean,
}

export interface Person {
    username: string,
    passowrd: string,
}

export interface CreateCorpState {
    corpID: string,
    longName: string,
    shortName: string,
    reservedAssets: number
}

export interface CreateBankState {
    bankID: string,
    bankName: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    reservedAssets: number,
    corpIDList: Array<string>,
    corpID: "",
    managerList: Array<string>,
    manager: "",
    employeeList: Array<string>,
    employee: ""
}

export interface CreateEmployeeState {
    people: Array<any>
    personID: string,
    password: string,
    salary: number,
    numPayments: number,
    accumulatedEarnings: number
}

export interface CreateCustomerState {
    peopleList: Array<any>,
    personID: string,
    password: string,
}

export interface StopEmployeeState {
    personList: Array<string>,
    personID: string,
}
export interface StopCustomerState {
    personList: Array<string>,
    personID: string,
}

export interface LoginState {
    id: string,
    password: string,
}

export interface HireWorkerState {
    bankList: Array<string>,
    bank: string,
    employeeList: Array<string>,
    employee: string,
}

export interface ReplaceManagerState {
    bankList: Array<string>,
    bank: string,
    employeeList: Array<string>,
    employee: string,
    salary: number,
}

export interface CreateFeeState {
    bankList: Array<string>,
    bank: string,
    accountList: Array<string>,
    account: string,
    feeType: string,
}

export interface ManageAccountAccessState {
    accountList: Array<string>,
    account: string,
    customerList: Array<string>,
    customer: string,
    addOwner: boolean,
    initialBalance: number,
    minBalance: number,
    interestRate: number,
    maxWithdrawals: number,
    bankList: Array<string>,
    bank: string,
    accountIDList: Array<string>,
    accountID: string,
    accountTypeList: Array<string>
    accountType: string,
}