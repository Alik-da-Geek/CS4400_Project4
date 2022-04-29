export interface HomeState {
    username: string,
    password: string,
    accountID: string,
    loggedIn: boolean,
    admin: boolean,
    manager: boolean,
    customer: boolean,
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
    personList: Array<string>,
    personID: string,
    salary: number,
    numPayments: number,
    accumulatedEarnings: number
}

export interface CreateCustomerState {
    personList: Array<string>,
    personID: string,
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

