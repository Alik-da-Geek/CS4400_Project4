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

export interface CreateBankProps {
    corpIDList: Array<string>,
    peopleIDList: Array<string>,
}

export interface GeneralProps {

}

export interface CreateEmployeeState {
    personID: string,
    salary: number,
    numPayments: number,
    accumulatedEarnings: number
}

export interface CreateCustomerState {
    accountName: string,
}

export interface StopEmployeeState {
    accountName: string,
}
export interface StopCustomerState {
    accountName: string,
}

export interface LoginState {
    id: string,
    password: string,
}

