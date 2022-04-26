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
    corpID: string,
    manager: string,
    bank_employee: string
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