const API_BASE_URL = "http://localhost:5161/api";

function showMessage(text, type = "success") {
  const box = document.getElementById("messageBox");
  if (!box) return;

  box.innerHTML = `<div class="message ${type}">${text}</div>`;

  setTimeout(() => {
    box.innerHTML = "";
  }, 3000);
}

async function loadCourses() {
  const container = document.getElementById("coursesContainer");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE_URL}/Course`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<div class="card"><p>No courses found.</p></div>`;
      return;
    }

    container.innerHTML = data
      .map(course => {
        const seatBadge =
          course.seatsAvailable > 0
            ? `<span class="badge badge-success">Seats: ${course.seatsAvailable}</span>`
            : `<span class="badge badge-danger">Full</span>`;

        return `
          <div class="card">
            <h3>${course.courseName}</h3>
            <p><strong>Course ID:</strong> ${course.courseId}</p>
            <p><strong>Department ID:</strong> ${course.departmentId}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${seatBadge}</p>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `<div class="card"><p>Failed to load courses.</p></div>`;
  }
}

async function searchCourses() {
  const keyword = document.getElementById("searchInput")?.value.trim();
  const container = document.getElementById("coursesContainer");
  if (!container) return;

  if (!keyword) {
    showMessage("Enter a keyword to search.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Course/search?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<div class="card"><p>No matching courses found.</p></div>`;
      return;
    }

    container.innerHTML = data
      .map(course => `
        <div class="card">
          <h3>${course.courseName}</h3>
          <p><strong>Course ID:</strong> ${course.courseId}</p>
          <p><strong>Department ID:</strong> ${course.departmentId}</p>
          <p><strong>Credits:</strong> ${course.credits}</p>
          <p><span class="badge badge-success">Seats: ${course.seatsAvailable}</span></p>
        </div>
      `)
      .join("");
  } catch (error) {
    showMessage("Search failed.", "error");
  }
}

async function enrollStudent() {
  const studentId = document.getElementById("studentIdInput")?.value;
  const courseId = document.getElementById("courseIdInput")?.value;

  if (!studentId || !courseId) {
    showMessage("Enter both Student ID and Course ID.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Enrollment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId: Number(studentId),
        courseId: Number(courseId)
      })
    });

    const text = await response.text();

    if (!response.ok) {
      showMessage(text || "Enrollment failed.", "error");
      return;
    }

    showMessage("Student enrolled successfully.");
    loadCourses();
  } catch (error) {
    showMessage("Enrollment failed.", "error");
  }
}

async function loadActiveEnrollments() {
  const container = document.getElementById("enrollmentsContainer");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE_URL}/Enrollment/active`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<div class="card"><p>No active enrollments found.</p></div>`;
      return;
    }

    container.innerHTML = data
      .map(item => `
        <div class="card">
          <h3>${item.course?.courseName ?? "Course"}</h3>
          <p><strong>Enrollment ID:</strong> ${item.enrollmentId}</p>
          <p><strong>Student ID:</strong> ${item.studentId}</p>
          <p><strong>Course ID:</strong> ${item.courseId}</p>
          <p><strong>Enrollment Date:</strong> ${new Date(item.enrollmentDate).toLocaleString()}</p>
          <p><span class="badge badge-success">Active</span></p>
        </div>
      `)
      .join("");
  } catch (error) {
    container.innerHTML = `<div class="card"><p>Failed to load active enrollments.</p></div>`;
  }
}

async function loadEnrollmentHistory() {
  const container = document.getElementById("enrollmentsContainer");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE_URL}/Enrollment/history`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<div class="card"><p>No enrollment history found.</p></div>`;
      return;
    }

    container.innerHTML = data
      .map(item => `
        <div class="card">
          <h3>${item.course?.courseName ?? "Course"}</h3>
          <p><strong>Enrollment ID:</strong> ${item.enrollmentId}</p>
          <p><strong>Student ID:</strong> ${item.studentId}</p>
          <p><strong>Course ID:</strong> ${item.courseId}</p>
          <p><strong>Dropped On:</strong> ${item.dropDate ? new Date(item.dropDate).toLocaleString() : "-"}</p>
          <p><span class="badge badge-warning">Dropped</span></p>
        </div>
      `)
      .join("");
  } catch (error) {
    container.innerHTML = `<div class="card"><p>Failed to load enrollment history.</p></div>`;
  }
}

async function dropCourse() {
  const studentId = document.getElementById("dropStudentIdInput")?.value;
  const courseId = document.getElementById("dropCourseIdInput")?.value;

  if (!studentId || !courseId) {
    showMessage("Enter both Student ID and Course ID.", "error");
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/Enrollment/drop?courseId=${Number(courseId)}&studentId=${Number(studentId)}`,
      { method: "DELETE" }
    );

    const text = await response.text();

    if (!response.ok) {
      showMessage(text || "Drop failed.", "error");
      return;
    }

    showMessage("Course dropped successfully.");
    loadActiveEnrollments();
  } catch (error) {
    showMessage("Drop failed.", "error");
  }
}
