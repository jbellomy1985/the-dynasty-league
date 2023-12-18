export type PasswordValidationType = {
    is8CharLong: boolean;
    containsNumber: boolean;
    containsUpperCase: boolean;
    containsLowerCase: boolean;
    containsSpecialCharacter: boolean;
}

const defaultValidations = {
    is8CharLong: false,
    containsNumber: false,
    containsUpperCase: false,
    containsLowerCase: false,
    containsSpecialCharacter: false
};

export default class PasswordValidation {
    static defaultValidations = defaultValidations;
    static validate(password: string): PasswordValidationType {
        const validations = {...defaultValidations};
        if(password.length >= 8) {
            validations.is8CharLong = true;
        }
        if(password.match(/\d+/)) {
            validations.containsNumber = true;
        }
        if(password.match(/[A-Z]/)) {
            validations.containsUpperCase = true;
        }
        if(password.match(/[a-z]/)) {
            validations.containsLowerCase = true;
        }
        if(password.match(/[~`!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/)) {
            validations.containsSpecialCharacter = true;
        }
    
        return validations;
    }
}