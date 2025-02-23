function generateReport() {
    let subject = document.getElementById("subject").value;
    let customSubject = document.getElementById("customSubject").value;
    let studentData = document.getElementById("studentData").value.trim();

    if (subject === "Custom") {
        subject = customSubject || "Unknown Subject";
    }

    if (studentData === "") {
        alert("Please enter student data.");
        return;
    }

    let students = studentData.split("\n");
    let reportMessage = `📢 Student Test Report\n📚 Subject: ${subject}\n\n`;

    students.forEach(line => {
        let parts = line.split(",");
        if (parts.length === 3) {
            let name = parts[0].trim();
            let marks = parts[1].trim();
            let phone = parts[2].trim();
            let message = `${reportMessage}👨‍🎓 ${name} - ${marks}/100\n`;

            let whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        }
    });
}
