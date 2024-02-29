let generatedOtp = '';

document.getElementById('sendOtpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Ensure the mobile number is a string and prepend with "91"
    const mobileNumber = "91" + document.getElementById('mobileNumber').value.toString();
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

    formdata.append("authToken", "U2FsdGVkX199I1HXlKEBMtBz68ayqMXyv7cH8yyK4e2rG0u3yeL90PpD09bN5Xdj6MIq2P26hMJFHHkXE2u0CcFkUt8cW1Kk3sO3KXLrYl+jEwgv4O92sUOnGG/2uFBQYbyrk2ESeXhryDusEndZ2bLQhSaoJ5HbqNLsGKt4RQMe15++xvIvLuGl/g81rxCG");
    formdata.append("sendto", mobileNumber);
    formdata.append("originWebsite", "https://dia.clothing");
    formdata.append("templateName", "verify");
    formdata.append("data[0]",otp );
    formdata.append("language", "en");
    
    
    

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
        // Retrieve and prepend "91" to the mobile number for consistency
        const mobileNumber = "91" + document.getElementById('mobileNumber').value.toString();
        triggerGoogleAppsScript(mobileNumber); // Trigger Google Apps Script with the mobile number
    } else {
        alert('Incorrect OTP, please try again.');
    }
}

function triggerGoogleAppsScript(mobileNumber) {
    console.log("app script");
    const scriptUrl = `https://script.google.com/macros/s/AKfycbxbWN0JJHpZa4sQHPiADo34vGZ-mg6BYeor4MPK053u-rxW54ikCXjsapWZAJ-Rk2PNxA/exec=${encodeURIComponent(mobileNumber)}`;

    fetch(scriptUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Google Apps Script triggered successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error triggering Google Apps Script');
        });
}
