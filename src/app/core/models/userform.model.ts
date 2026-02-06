
export interface UserForm {
    firstName: string;
    lastName: string;
    maidenName: string;
    email: string;
    phone: string;
}

export const defaultUserData: UserForm = {
        firstName: '',
    lastName: '',
    maidenName: '',
    email: '',
    phone: ''
}