const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

// JavaScript for handling course selection

// Function to handle course selection
function handleCourseSelection(course) {
    // Construct the URL with the selected course as a query parameter
    const url = '../../public/index.html?course=' + course;
    // Redirect to the index page with the selected course
    window.location.href = url;
}

// Event listeners for course selection
document.addEventListener('DOMContentLoaded', function() {
    const courseLinks = document.querySelectorAll('.slider a');
    courseLinks.forEach(function(courseLink) {
        courseLink.addEventListener('click', function(event) {
            // Prevent the default link behavior
            event.preventDefault();
            // Get the selected course value from the data-value attribute
            const selectedCourse = courseLink.getAttribute('data-value');
            // Handle the course selection
            handleCourseSelection(selectedCourse);
        });
    });
});