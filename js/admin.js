import { getDoctors, saveDoctor, deleteDoctor, getDoctorById } from './doctors.js';

const tableBody = document.getElementById('doctors-table-body');
const modal = document.getElementById('doctor-modal');
const modalTitle = document.getElementById('modal-title');
const form = document.getElementById('doctor-form');
const addBtn = document.getElementById('add-doctor-btn');
const closeBtn = document.getElementById('close-modal');

// Initial Load
function renderDoctors() {
    const doctors = getDoctors();
    tableBody.innerHTML = '';

    doctors.forEach(doc => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${doc.image}" alt="${doc.name}" onerror="this.src='img/default-doctor.jpg'"></td>
            <td><strong>${doc.name}</strong></td>
            <td>${doc.department}</td>
            <td>${doc.role}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-id="${doc.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${doc.id}"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Attach Event Listeners to dynamic buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => openEditModal(e.target.closest('button').dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => handleDelete(e.target.closest('button').dataset.id));
    });
}

// Open Modal
function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    form.reset();
    document.getElementById('doctor-id').value = '';
}

function openEditModal(id) {
    const doc = getDoctorById(id);
    if (!doc) return;

    modalTitle.innerText = 'Edit Doctor';
    document.getElementById('doctor-id').value = doc.id;
    document.getElementById('name').value = doc.name || '';
    document.getElementById('department').value = doc.department || 'Cardiology';
    document.getElementById('role').value = doc.role || '';
    document.getElementById('qualification').value = doc.qualification || '';
    document.getElementById('fee').value = doc.fee || '';
    document.getElementById('image').value = doc.image || '';
    document.getElementById('bio').value = doc.bio || '';
    document.getElementById('schedule').value = doc.schedule || '';

    openModal();
}

function handleDelete(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        deleteDoctor(id);
        renderDoctors();
    }
}

// Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('doctor-id').value;
    const newDoc = {
        id: id || 'doc-' + Date.now(),
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        role: document.getElementById('role').value,
        qualification: document.getElementById('qualification').value,
        fee: document.getElementById('fee').value,
        image: document.getElementById('image').value,
        bio: document.getElementById('bio').value,
        schedule: document.getElementById('schedule').value
    };

    saveDoctor(newDoc);
    closeModal();
    renderDoctors();
});

// Event Listeners
addBtn.addEventListener('click', () => {
    modalTitle.innerText = 'Add New Doctor';
    openModal();
});

closeBtn.addEventListener('click', closeModal);

// Click outside to close
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize
renderDoctors();
