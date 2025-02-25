// Event listener for form submission
document.getElementById('defect-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const defectData = {
        defect_id: document.getElementById('defect_id').value,
        title: document.getElementById('title').value,
        owasp_category: document.getElementById('owasp_category').value,
        cvss_score: parseFloat(document.getElementById('cvss_score').value),
        severity: document.getElementById('severity').value,
        description: document.getElementById('description').value,
        attachment_url: document.getElementById('attachment').value
    };

    // Calculate severity based on CVSS score (example logic)
    if (defectData.cvss_score >= 9) {
        defectData.severity = "Critical";
    } else if (defectData.cvss_score >= 7) {
        defectData.severity = "High";
    } else if (defectData.cvss_score >= 4) {
        defectData.severity = "Medium";
    } else {
        defectData.severity = "Low";
    }

    // Update severity field
    document.getElementById('severity').value = defectData.severity;

    // Optional: Update CVSS Severity Score display (you can modify this logic)
    document.getElementById('cvss_severity_score').value = defectData.cvss_score;

    // Call the backend API to submit defect (make sure your backend is running)
    fetch('http://localhost:5000/submit_defect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(defectData),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => alert('Error: ' + error));
});

// Function to calculate CVSS Score based on selected metrics
function calculateCVSS() {
    const attackVector = document.getElementById('attack_vector').value;
    const attackComplexity = document.getElementById('attack_complexity').value;
    const privilegesRequired = document.getElementById('privileges_required').value;
    const userInteraction = document.getElementById('user_interaction').value;
    const scope = document.getElementById('scope').value;

    let score = 0.0;

    // Sample calculation (simplified for the sake of this example)
    if (attackVector === 'Network') score += 0.85;
    else if (attackVector === 'Adjacent Network') score += 0.62;
    else if (attackVector === 'Local') score += 0.55;
    else score += 0.2;

    if (attackComplexity === 'Low') score += 0.77;
    else score += 0.44;

    if (privilegesRequired === 'None') score += 0.85;
    else if (privilegesRequired === 'Low') score += 0.62;
    else score += 0.27;

    if (userInteraction === 'None') score += 0.85;
    else score += 0.62;

    if (scope === 'Changed') score *= 1.5;

    // Update CVSS score
    document.getElementById('cvss_score').value = score.toFixed(1);
}

// Update CVSS score when the metrics are changed
document.querySelectorAll('select').forEach(element => {
    element.addEventListener('change', calculateCVSS);
});

// Initial CVSS score calculation
calculateCVSS();
