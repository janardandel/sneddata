function generateReport() {
    let subject = document.getElementById("subject").value;
    let customSubject = document.getElementById("customSubject");

    // Use custom subject if selected
    if (subject === "Custom") {
        subject = customSubject.value.trim() || "Unknown Subject";
    }

    let studentData = document.getElementById("studentData").value.trim();

    if (studentData === "") {
        alert("Please paste student data.");
        return;
    }

    let students = studentData.split("\n"); // Split by newlines
    let reportMessage = `📢 Student Test Report\n📚 Subject: ${subject}\n\n`;

    students.forEach(line => {
        // First, try splitting by tab
        let parts = line.split(/\t/);

        // If splitting by tab didn't give enough parts, try splitting by two or more spaces
        if (parts.length < 3) {
            parts = line.trim().split(/\s{2,}/);
        }

        if (parts.length >= 3) {
            let name = parts[0].trim();
            let marks = parts[1].trim();
            let phone = parts[2].trim();

            if (phone.match(/^\d{10,}$/)) { // Validate phone number
                let message = `${reportMessage}👨‍🎓 ${name} - ${marks}/100\n`;
                let whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            } else {
                alert(`Invalid phone number for ${name}: ${phone}`);
            }
        } else {
            alert(`Invalid format: ${line}`);
        }
    });
}
