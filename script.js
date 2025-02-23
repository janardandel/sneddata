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

    let students = studentData.split("\n"); // Split by line
    let reportMessage = `📢 Student Test Report\n📚 Subject: ${subject}\n\n`;

    students.forEach(line => {
        // Auto-detect whether the data is tab-separated (from Sheets/Excel) or comma-separated
        let parts;
        if (line.includes("\t")) {
            parts = line.split("\t"); // Split by TAB if detected
        } else {
            parts = line.split(","); // Otherwise, split by comma
        }

        if (parts.length >= 3) { // Ensure at least 3 columns (Name, Marks, Phone)
            let name = parts[0].trim();
            let marks = parts[1].trim();
            let phone = parts[2].trim();

            if (phone.match(/^\d{10,}$/)) { // Validate phone number (10+ digits)
                let message = `${reportMessage}👨‍🎓 ${name} - ${marks}/100\n`;

                let whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            } else {
                alert(`Invalid phone number for ${name}: ${phone}`);
            }
        } else {
            alert(`Invalid format detected in: ${line}`);
        }
    });
}
