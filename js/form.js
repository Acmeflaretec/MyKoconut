const scriptURL = 'https://script.google.com/macros/s/AKfycbyCjwK5AkT5Y5EUPPZ9tfhaQRpFIm4Md-eaC8anCA0uWucD28Z0H0meud9nL5ph8TAq/exec';
    const form = document.forms['contact-form'];
    const submitButton = document.getElementById('submit');

    function validateForm() {
        submitButton.disabled = !form.checkValidity();
    }

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!form.checkValidity()) {
            return;
        }

        const phoneInput = document.getElementById('phone').value;
        const phoneError = document.getElementById('phoneError');
        const phonePattern = /^\d{10,}$/;

        if (!phonePattern.test(phoneInput)) {
            phoneError.textContent = "Please enter at least 10 digits.";
            return;
        } else {
            phoneError.textContent = "";
        }

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                alert("Thank you! Your form is submitted successfully.");
                window.location.reload();
            })
            .catch(error => console.error('Error!', error.message));
    });

    validateForm();  // Initialize form validation on load