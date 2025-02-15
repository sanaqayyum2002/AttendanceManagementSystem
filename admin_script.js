document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        records: document.getElementById('records-section'),
        attendance: document.getElementById('attendance-section'),
        leave: document.getElementById('leave-section'),
        report: document.getElementById('report-section'),
        grading: document.getElementById('grading-section'),
        systemReport: document.getElementById('system-report-section'),
    };

    const navButtons = {
        viewRecords: document.getElementById('view-records'),
        addAttendance: document.getElementById('add-attendance'),
        leaveApproval: document.getElementById('leave-approval'),
        generateReport: document.getElementById('generate-report'),
        gradingSystem: document.getElementById('grading-system'),
        systemReport: document.getElementById('system-report'),
    };

    let studentRecords = [
        { name: 'John Doe', attendance: [] },
        { name: 'Jane Smith', attendance: [] }
    ];
    let leaveRequests = [];
    let gradingThresholds = { A: 26, B: 20, C: 15, D: 10 };

    function showSection(section) {
        for (const key in sections) {
            sections[key].classList.toggle('hidden', key !== section);
        }
    }

    // Navigation Button Clicks
    navButtons.viewRecords.addEventListener('click', () => showSection('records'));
    navButtons.addAttendance.addEventListener('click', () => showSection('attendance'));
    navButtons.leaveApproval.addEventListener('click', () => showSection('leave'));
    navButtons.generateReport.addEventListener('click', () => showSection('report'));
    navButtons.gradingSystem.addEventListener('click', () => showSection('grading'));
    navButtons.systemReport.addEventListener('click', () => showSection('systemReport'));

    function updateRecordsTable() {
        const tableBody = document.querySelector('#records-table tbody');
        tableBody.innerHTML = studentRecords.map(record => `
            <tr>
                <td>${record.name}</td>
                <td>${record.attendance.length} days</td>
                <td>
                    <button class="action-button" onclick="editAttendance('${record.name}')">Edit</button>
                    <button class="action-button" onclick="deleteRecord('${record.name}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    function updateLeaveTable() {
        const tableBody = document.querySelector('#leave-table tbody');
        tableBody.innerHTML = leaveRequests.map(request => `
            <tr>
                <td>${request.name}</td>
                <td>${request.reason}</td>
                <td>
                    <button class="action-button" onclick="approveLeave('${request.name}')">Approve</button>
                    <button class="action-button" onclick="rejectLeave('${request.name}')">Reject</button>
                </td>
            </tr>
        `).join('');
    }

    // Add Attendance
    document.getElementById('attendance-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('student-name').value;
        const date = document.getElementById('attendance-date').value;
        const student = studentRecords.find(record => record.name === name);

        if (student && date) {
            student.attendance.push(date);
            alert('Attendance added successfully.');
            updateRecordsTable();
        } else {
            alert('Please provide valid student name and date.');
        }
    });

    // Edit Attendance
    window.editAttendance = function(name) {
        const date = prompt('Enter new date for attendance (YYYY-MM-DD):');
        const student = studentRecords.find(record => record.name === name);

        if (student && date) {
            const index = student.attendance.indexOf(date);
            if (index !== -1) {
                student.attendance[index] = date;
                alert('Attendance updated successfully.');
                updateRecordsTable();
            } else {
                alert('Attendance not found.');
            }
        } else {
            alert('Please provide valid student name and date.');
        }
    };

    // Delete Record
    window.deleteRecord = function(name) {
        studentRecords = studentRecords.filter(record => record.name !== name);
        alert('Record deleted successfully.');
        updateRecordsTable();
    };

    // Leave Requests
    window.approveLeave = function(name) {
        leaveRequests = leaveRequests.filter(request => request.name !== name);
        alert('Leave request approved.');
        updateLeaveTable();
    };

    window.rejectLeave = function(name) {
        leaveRequests = leaveRequests.filter(request => request.name !== name);
        alert('Leave request rejected.');
        updateLeaveTable();
    };

    // Generate Report
    document.getElementById('report-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const user = document.getElementById('report-user').value;
        const from = document.getElementById('report-from').value;
        const to = document.getElementById('report-to').value;

        const report = `
            <h4>Report for ${user} from ${from} to ${to}</h4>
            <p>Attendance details would be displayed here.</p>
        `;
        document.getElementById('report-output').innerHTML = report;
    });

    // Grading System
    document.getElementById('grading-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const daysAttended = parseInt(document.getElementById('grading-days').value);
        let grade;

        for (const [key, value] of Object.entries(gradingThresholds)) {
            if (daysAttended >= value) {
                grade = key;
                break;
            }
        }

        document.getElementById('grading-output').innerHTML = `Grade: ${grade || 'F'}`;
    });

    // Generate System Report
    document.getElementById('system-report-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const from = document.getElementById('system-report-from').value;
        const to = document.getElementById('system-report-to').value;

        const systemReport = `
            <h4>System Report from ${from} to ${to}</h4>
            <p>Complete attendance details would be displayed here.</p>
        `;
        document.getElementById('system-report-output').innerHTML = systemReport;
    });

    // Initial setup
    updateRecordsTable();
    updateLeaveTable();
});
