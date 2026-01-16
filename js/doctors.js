/* Relies on window.initialDoctors from doctor-data.js */

const DOC_STORAGE_KEY = 'medicoz_doctors';

// Initialize data if not present
if (!localStorage.getItem(DOC_STORAGE_KEY)) {
    // Assuming initialDoctors might be defined in doctor-data.js attached to window
    // Ensure doctor-data.js is loaded BEFORE this file
    if (window.initialDoctors) {
        localStorage.setItem(DOC_STORAGE_KEY, JSON.stringify(window.initialDoctors));
    }
}

window.getDoctors = () => {
    const doctors = localStorage.getItem(DOC_STORAGE_KEY);
    return doctors ? JSON.parse(doctors) : (window.initialDoctors || []);
};

window.getDoctorById = (id) => {
    const doctors = window.getDoctors();
    return doctors.find(doc => doc.id === id);
};

window.saveDoctor = (doctor) => {
    const doctors = window.getDoctors();
    const existingIndex = doctors.findIndex(d => d.id === doctor.id);

    if (existingIndex >= 0) {
        doctors[existingIndex] = doctor;
    } else {
        doctors.push(doctor);
    }

    localStorage.setItem(DOC_STORAGE_KEY, JSON.stringify(doctors));
};

window.deleteDoctor = (id) => {
    let doctors = window.getDoctors();
    doctors = doctors.filter(doc => doc.id !== id);
    localStorage.setItem(DOC_STORAGE_KEY, JSON.stringify(doctors));
};

window.getAllDepartments = () => {
    const doctors = window.getDoctors();
    const departments = [...new Set(doctors.map(d => d.department))];
    return departments;
};
