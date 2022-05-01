export interface LoginProps {
    setRole: (role: string, username: string, password: string) => void
}

export interface CreateFeeProps {
    customerID: string,
}

export interface ManageAccountAccessProps {
    admin: boolean,
    requesterID: string,
}

export interface MakeDepositProps {
    customerID: string,
}