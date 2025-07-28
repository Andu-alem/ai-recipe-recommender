
interface SignUpFormData {
    name: string,
    email: string,
    password: string
}

interface PasswordCheck {
    length: boolean
    hasUpperCase: boolean
    hasNumber: boolean
}

interface PasswordCheckValues {
    value: PasswordCheck
}

export function useFormValidation() {
    const errors = reactive({
        name: "",
        email: "",
        password: ""
    })

    const validateForm = (formData: SignUpFormData, passwordChecks: PasswordCheckValues) => {
        let isValid = true;
      
        // Name validation
        if (!formData.name) {
            errors.name = 'Please enter your name';
            isValid = false;
        } else if (formData.name.length < 2) {
            errors.name = 'Name must be at least 2 characters long';
            isValid = false;
        } else {
            errors.name = '';
        }
      
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = 'Please enter your email address';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        } else {
            errors.email = '';
        }
      
        // Password validation
        if (!formData.password) {
            errors.password = 'Please enter a password';
            isValid = false;
        } else if (!passwordChecks.value.length) {
            errors.password = 'Password must be at least 8 characters long';
            isValid = false;
        } else if (!passwordChecks.value.hasUpperCase) {
            errors.password = 'Password must contain at least one uppercase letter';
            isValid = false;
        } else if (!passwordChecks.value.hasNumber) {
            errors.password = 'Password must contain at least one number';
            isValid = false;
        } else {
            errors.password = '';
        }
      
        return isValid;
    };

    return {
        errors,
        validateForm
    }
}