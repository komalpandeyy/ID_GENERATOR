 // Import the User model from index.js

async function getUserData() {
    const rollNo = document.getElementById("EnrollmentID").value.trim();
    try {
        const response = await fetch(`http://localhost:3000/api/users/${rollNo}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        // alert("Users:", users); // Log the users array
        if (users && users.length > 0) {
            const user = users[0]; // Get the first user object from the array
            // Redirect to id.html page with user data as URL parameters
            const urlParams = new URLSearchParams({
                name: user.name,
                enrollment_no: user.eno,
                father_name: user.fname,
                program: user.program,
                dob: user.dob,
                // validity: user.validity,
                address: user.address,
                phone_no: user.phone,
            });
            window.location.href = "id.html?" + urlParams.toString();
        } else {
            // Handle case when no user is found
            alert("No user found for roll number: " + rollNo);
        }
    } catch (error) {
        console.error(error);
        alert("Error fetching user data: " + error.message);
    }
}


