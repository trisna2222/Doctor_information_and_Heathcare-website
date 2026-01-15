import { initialDoctors } from './doctor-data.js';

const STORAGE_KEY = 'medicoz_doctors';

// Initialize data if not present
if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDoctors));
}

export const getDoctors = () => {
    const doctors = localStorage.getItem(STORAGE_KEY);
    return doctors ? JSON.parse(doctors) : [];
};

export const getDoctorById = (id) => {
    const doctors = getDoctors();
    return doctors.find(doc => doc.id === id);
};

export const saveDoctor = (doctor) => {
    const doctors = getDoctors();
    const existingIndex = doctors.findIndex(d => d.id === doctor.id);

    if (existingIndex >= 0) {
        doctors[existingIndex] = doctor;
    } else {
        doctors.push(doctor);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
};

export const deleteDoctor = (id) => {
    let doctors = getDoctors();
    doctors = doctors.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
};

export const getAllDepartments = () => {
    const doctors = getDoctors();
    const departments = [...new Set(doctors.map(d => d.department))];
    return departments;
};
