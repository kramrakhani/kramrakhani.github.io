let generatedOtp = '';

document.getElementById('sendOtpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const mobileNumber = document.getElementById('mobileNumber').value;
    generatedOtp = generateOtp();
    sendOtpViaWhatsApp(mobileNumber, generatedOtp);
});

function generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
    return otp.toString();
}

function sendOtpViaWhatsApp(mobileNumber, otp) {
    var formdata = new FormData();
    // Update your form data accordingly
    formdata.append("authToken", "YourAuthToken");
    formdata.append("sendto", mobileNumber);
    formdata.append("data", `Your OTP is: ${otp}`);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://app.11za.in/apis/template/sendTemplate", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            // Show OTP input section on success
            document.getElementById('otpSection').style.display = 'block';
        })
        .catch(error => console.log('error', error));
}

function verifyOtp() {
    const userOtp = document.getElementById('otpInput').value;
    if(userOtp === generatedOtp) {
        alert('OTP Verified Successfully!');
        // Here you can trigger your Google Apps Script or any other action needed upon successful verification
    } else {
        alert('Incorrect OTP, please try again.');
    }
}
