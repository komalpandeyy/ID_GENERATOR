// id.js

  window.onload = function () {
    
    const labels = document.querySelectorAll('.student-info .info label ');

    labels.forEach(label => {
        const input = label.nextElementSibling;
        const labelWidth = label.offsetWidth;
        const marginRight = 125 - labelWidth;
        label.style.marginRight = `${marginRight}px`;
    });
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const name = urlParams.get("name");
    const enrollment_no = urlParams.get("enrollment_no");
    const father_name = urlParams.get("father_name");
    const program = urlParams.get("program");
    const dob = urlParams.get("dob");
    // const validity = urlParams.get("validity");
    const address = urlParams.get("address");
    const phone_no = urlParams.get("phone_no");

console.log(name+enrollment_no+father_name);
    if (name) {
      document.getElementById("name").value = name;
    }

   if (enrollment_no) {
      document.getElementById("enrollmentNo").value = enrollment_no;
    }

    if (father_name) {
      document.getElementById("fatherName").value = father_name;
    }

    if (program) {
      document.getElementById("program").value = program;
    }

    if (dob) {
      document.getElementById("dob").value = dob;
   }

    if (validity) {
       document.getElementById("validity").value = calculateValidity(program,enrollment_no);
    }

    if (address) {
      document.getElementById("address").value = address;
    }

    if (phone_no) {
      document.getElementById("phone").value = phone_no;
   }


  };
//   getParams();
function calculateValidity(program, eno) {
    // Assuming the last 4 digits of enrollment number represent the year
    const year = eno.slice(-4);
    let validityDate = "31-05-" + year;
    switch (program.toUpperCase()) {
      case "MCA":
      case "MTECH":
      case "MBA":
        // For MCA, MTech, MBA, add 2 years to validity
        validityDate = addYearsToDate(validityDate, 2);
        break;
      case "BTECH":
        // For BTech, add 4 years to validity
        validityDate = addYearsToDate(validityDate, 4);
        break;
      case "PHD":
        // For PhD, add 5 years to validity
         validityDate = addYearsToDate(validityDate, 5);
        break;
      default:
        // Default validity date
        break;
    }
    
    return validityDate;
  }
  
  // Function to add years to a given date (in DD-MM-YYYY format)
  function addYearsToDate(dateStr, years) {
    const [day, month, year] = dateStr.split("-");
    const newYear = parseInt(year) + years;
    return `${day}-${month}-${newYear}`;
  }
  

  function previewImage(event) {
    const preview = document.getElementById('imagePreview');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        preview.innerHTML = `<img src="${reader.result}" alt="Image Preview">`;
        document.getElementById('browseButton').style.display = 'none';
        document.getElementById('photo').style.display = 'none';
        const reInsertButton = document.createElement('button');
        reInsertButton.textContent = 'Re-insert';
        reInsertButton.onclick = function() {
            document.getElementById('browseButton').style.display = 'block';
            document.getElementById('photo').style.display = 'block';
            // preview.innerHTML = '<img src="placeholder.png" alt="Image Preview">';
        };
        preview.appendChild(reInsertButton);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.onclick = function() {
            reInsertButton.style.display = 'none';
            saveButton.style.display = 'none';
        };
        preview.appendChild(saveButton);
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '<img src="placeholder.png" alt="Image Preview">';
    }
}