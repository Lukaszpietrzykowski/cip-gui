export const baseUrl = 'http://localhost:8080';

export const Patient = {
    firstName: "",
    lastName: "",
    pesel: "",
    birthDate: "",
    age: "",
    gender: "",
    departmentId: ""
}

export const User = {
    email: '',
    login: '',
    password: '',
    role: ''
}

export const Address = {
    city: '',
    street: '',
    streetNumber: '',
    postalCode: '' 
}

export const Hospital = {
    name: '',
    address: {
        ...Address
    }
}

export const Department = {
    name: '',
    availableBeds: '',
    remainingBeds: ''
}