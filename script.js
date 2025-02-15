document.addEventListener('DOMContentLoaded', function() {
    const markAttendanceButton = document.getElementById('mark-attendance');
    const viewAttendanceButton = document.getElementById('view-attendance');
    const markLeaveButton = document.getElementById('mark-leave');
    const profilePictureInput = document.getElementById('profile-picture');

    const attendanceLog = document.getElementById('attendance-log');
    const leaveLog = document.getElementById('leave-log');

    let attendanceMarked = false;
    let attendanceList = [];
    let leaveRequests = [];

    // Sample student name
    const studentName = "John Doe";

    // Mark Attendance Logic
    markAttendanceButton.addEventListener('click', function() {
        if (attendanceMarked) {
            alert('Attendance has already been marked for today.');
        } else {
            attendanceMarked = true;
            attendanceList.push(studentName);
            alert(`${studentName}'s attendance marked successfully.`);
        }
    });

    // View Attendance Logic
    viewAttendanceButton.addEventListener('click', function() {
        attendanceLog.style.display = 'block';
        attendanceLog.innerHTML = `<h3>Attendance Log</h3><ul>${attendanceList.map(name => `<li>${name}</li>`).join('')}</ul>`;
    });

    // Mark Leave Logic
    markLeaveButton.addEventListener('click', function() {
        const leaveReason = prompt("Enter the reason for leave:");
        if (leaveReason) {
            leaveRequests.push({ name: studentName, reason: leaveReason });
            alert('Leave request sent to admin.');
            leaveLog.style.display = 'block';
            leaveLog.innerHTML = `<h3>Leave Requests</h3><ul>${leaveRequests.map(request => `<li>${request.name}: ${request.reason}</li>`).join('')}</ul>`;
        }
    });

    // Profile Picture Upload Logic
    profilePictureInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.querySelector('.profile-pic').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});
