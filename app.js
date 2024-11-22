const studentForm = document.querySelector("#studentForm");
const studentTable = document.querySelector("#studentTable tbody");
const studentName = document.querySelector(".name");
const studentId = document.querySelector(".id");
const email = document.querySelector(".email");
const contact = document.querySelector(".contact");
const buttonSubmit = document.querySelector(".submit");

document.addEventListener("DOMContentLoaded", loadStudents);

buttonSubmit.addEventListener("click", addStudentDetails);

function addStudentDetails() {

    //check validation of the user is not entering the details correctly then the alert message will pop-up for different conditions
    if (!validateInputs()) return;

    const newStudent = {
        name: studentName.value,
        id: studentId.value,
        email: email.value,
        contact: contact.value,
    };

    addStudentToTable(newStudent);
    saveStudentToLocalStorage(newStudent);
    studentName.value = "";
    studentId.value = "";
    email.value = "";
    contact.value = "";
}

function validateInputs() {
    if (studentName.value==='') {
        alert("Please enter a valid name (letters only).");
        return false;
    }
    if (!studentId.value.trim() || isNaN(studentId.value)) {
        alert("Student ID must be a number.");
        return false;
    }
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!contact.value.trim() || isNaN(contact.value)) {
        alert("Contact must be a number.");
        return false;
    }
    return true;
}

//function for adding student in the tabel

function addStudentToTable(student) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
    `;

    row.querySelector(".edit").addEventListener("click", () => editStudent(row, student));
    row.querySelector(".delete").addEventListener("click", () => deleteStudent(row, student.id));

    studentTable.appendChild(row);
}

//function for saving the details in the localstorage in the form of json

function saveStudentToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

//this function is for getting the details from the localstorage and displaying the Window when we refresh using the DOMContentLoaded 

function loadStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    studentTable.innerHTML = ""; 
    students.forEach(addStudentToTable);
}

//function to delete the user

function deleteStudent(row, studentId) {
    row.remove();

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();
}

//function to edit the user

function editStudent(row, student) {
    studentName.value = student.name;
    studentId.value = student.id;
    email.value = student.email;
    contact.value = student.contact;

    deleteStudent(row, student.id); 
}
