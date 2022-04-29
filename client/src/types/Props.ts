export interface LoginProps {
    setRole: (role: string, username: string, password: string) => void
}

export interface CreateFeeProps {
    customerID: string,
}