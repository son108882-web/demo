let studentModal;

// Khi trang load
document.addEventListener("DOMContentLoaded", () => {

    studentModal = new bootstrap.Modal(
        document.getElementById("studentModal")
    );

    loadStudents();

});


// ===============================
// LOAD STUDENTS
// ===============================

async function loadStudents(keyword = "") {

    try {

        let url = "/api/students";

        if (keyword.trim() !== "") {
            url += "?keyword=" + encodeURIComponent(keyword);
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu sinh viên");
        }

        const students = await response.json();

        renderStudents(students);

    } catch (error) {

        console.error(error);

        document.getElementById("studentTableBody").innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger py-4">
                    Không thể tải dữ liệu sinh viên
                </td>
            </tr>
        `;

    }

}


// ===============================
// HIỂN THỊ DANH SÁCH
// ===============================

function renderStudents(students) {

    const tbody = document.getElementById("studentTableBody");

    tbody.innerHTML = "";


    if (students.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    Không tìm thấy sinh viên
                </td>
            </tr>
        `;

        return;
    }


    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                <strong>
                    ${student.studentCode ?? ""}
                </strong>
            </td>

            <td>
                ${student.fullName ?? ""}
            </td>

            <td>
                ${student.email ?? ""}
            </td>

            <td>
                ${student.phone ?? ""}
            </td>

            <td>
                <span class="badge text-bg-info">
                    ${student.className ?? ""}
                </span>
            </td>

            <td class="text-center">

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editStudent('${student.id}')">

                    <i class="bi bi-pencil-square"></i>

                    Sửa

                </button>


                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteStudent('${student.id}')">

                    <i class="bi bi-trash"></i>

                    Xóa

                </button>

            </td>

        `;

        tbody.appendChild(row);

    });

}


// ===============================
// TÌM KIẾM
// ===============================

function searchStudents() {

    const keyword =
        document.getElementById("searchKeyword").value;

    loadStudents(keyword);

}


// Nhấn Enter trong ô tìm kiếm
document
    .getElementById("searchKeyword")
    ?.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            searchStudents();

        }

    });


// ===============================
// MỞ FORM THÊM
// ===============================

function openAddModal() {

    document.getElementById("modalTitle").innerText =
        "Thêm sinh viên";

    document.getElementById("studentId").value = "";

    document.getElementById("studentCode").value = "";

    document.getElementById("fullName").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("className").value = "";

    studentModal.show();

}


// ===============================
// SỬA SINH VIÊN
// ===============================

async function editStudent(id) {

    try {

        const response =
            await fetch(`/api/students/${id}`);

        if (!response.ok) {
            throw new Error("Không tìm thấy sinh viên");
        }

        const student = await response.json();


        document.getElementById("modalTitle").innerText =
            "Cập nhật sinh viên";


        document.getElementById("studentId").value =
            student.id;

        document.getElementById("studentCode").value =
            student.studentCode ?? "";

        document.getElementById("fullName").value =
            student.fullName ?? "";

        document.getElementById("email").value =
            student.email ?? "";

        document.getElementById("phone").value =
            student.phone ?? "";

        document.getElementById("className").value =
            student.className ?? "";


        studentModal.show();

    } catch (error) {

        alert(error.message);

    }

}


// ===============================
// THÊM / CẬP NHẬT
// ===============================

async function saveStudent() {

    const id =
        document.getElementById("studentId").value;


    const student = {

        studentCode:
            document.getElementById("studentCode").value.trim(),

        fullName:
            document.getElementById("fullName").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        className:
            document.getElementById("className").value.trim()

    };


    // Kiểm tra dữ liệu
    if (
        !student.studentCode ||
        !student.fullName ||
        !student.email
    ) {

        alert(
            "Vui lòng nhập mã sinh viên, họ tên và email!"
        );

        return;

    }


    try {

        let url = "/api/students";

        let method = "POST";


        // Nếu có ID -> UPDATE
        if (id) {

            url = `/api/students/${id}`;

            method = "PUT";

        }


        const response = await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });


        if (!response.ok) {

            throw new Error(
                "Không thể lưu sinh viên"
            );

        }


        studentModal.hide();

        loadStudents();

        alert(
            id
                ? "Cập nhật sinh viên thành công!"
                : "Thêm sinh viên thành công!"
        );


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


// ===============================
// XÓA SINH VIÊN
// ===============================

async function deleteStudent(id) {

    const confirmDelete =
        confirm("Bạn có chắc muốn xóa sinh viên này không?");


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(`/api/students/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {

            throw new Error(
                "Không thể xóa sinh viên"
            );

        }


        loadStudents();


        alert(
            "Xóa sinh viên thành công!"
        );


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}