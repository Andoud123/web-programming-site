var form = document.getElementById("profile-form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

const studentId = document.getElementById("student_id").value;
const fullname = document.getElementById("fullname").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const birthdate = document.getElementById("birthdate").value;
const portfolio = document.getElementById("portfolio").value;
const gin446 = document.getElementById("gin446").value;

const major = document.getElementById("major").value;
const gpa = document.getElementById("gpa").value;
const cred_nb = document.getElementById("cred_nb").value;
const grad = document.querySelector('input[name="graduation"]:checked')?.value;
const internship = document.querySelector('input[name="internship_completed"]:checked')?.value;

const skills = [...document.querySelectorAll('input[name="skills"]:checked')].map(checkbox => checkbox.value);
const language = document.getElementById("language").value;
const software = [...document.getElementById("software").selectedOptions].map(option => option.value);

const projectTitle = document.getElementById("project_title").value;
const projectArea = document.getElementById("project_area").value;
const description = document.getElementById("description").value;
const teamSize = document.getElementById("team_size").value;
const projectColor = document.getElementById("project_color").value;
const meetingDate = document.getElementById("meeting_date").value;
const meetingTime = document.getElementById("meeting_time").value;

const submission = [...document.querySelectorAll('input[name="confirmation"]:checked')].map(checkbox => checkbox.value);


var reviewPanel = document.createElement("div");
reviewPanel.className = "previewForm";
reviewPanel.textContent = "Please check your informations before submitting";


var panelList = document.createElement("ul");
panelList.innerHTML = `
    <li>Student ID: ${studentId}</li>
    <li>Full Name: ${fullname}</li>
    <li>Email: ${email}</li>
    <li>Phone: ${phone}</li>
    <li>Birthdate: ${birthdate}</li>
    <li>Portfolio: ${portfolio}</li>
    <li>GIN446 Website: ${gin446}</li>
    <li>Major: ${major}</li>
    <li>GPA: ${gpa}</li>
    <li>Number of Credits: ${cred_nb}</li>
    <li>Graduation Year: ${grad}</li>
    <li>Internship Completed: ${internship}</li>
    <li>Skills: ${skills.join(", ")}</li>
    <li>Language: ${language}</li>
    <li>Software: ${software.join(", ")}</li>
    <li>Project Title: ${projectTitle}</li>
    <li>Project Area: ${projectArea}</li>
    <li>Description: ${description}</li>
    <li>Team Size: ${teamSize}</li>
    <li>Project Color: ${projectColor}</li>
    <li>Meeting Date: ${meetingDate}</li>
    <li>Meeting Time: ${meetingTime}</li>
    <li>Submission Confirmation: ${submission.join(", ")}</li>
`;

reviewPanel.appendChild(panelList);


var editButton = document.createElement("button");
editButton.textContent = "Edit Form";

editButton.addEventListener("click", function () {
    panelList.remove();
    reviewPanel.remove();
    editButton.remove();
    confirmationButton.remove();
    form.style.display = "";
});

reviewPanel.appendChild(editButton);


var confirmationButton = document.createElement("button");
confirmationButton.textContent = "Confirm Form";

confirmationButton.addEventListener("click", function () {
    alert('Your form is Confirmed and Submitted');
    form.submit();
});

reviewPanel.appendChild(confirmationButton);


form.style.display = "none";
form.parentNode.insertBefore(reviewPanel, form);

});