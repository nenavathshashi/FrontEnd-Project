const getAge = document.getElementById('age');
const getDob = document.getElementById('dob');
const getFName = document.getElementById('fname');
const fNameErrorDisplay = document.getElementById('fname-error');
const getLName = document.getElementById('lname');
const lNameErrorDisplay = document.getElementById('lname-error');
const getUName = document.getElementById('uname');
const uNameErrorDisplay = document.getElementById('uname-error');
const getPassword1 = document.getElementById('password');
const getPassword2 = document.getElementById('confirm-password');
const password1ErrorDisplay = document.getElementById('password-error');
const password2ErrorDisplay = document.getElementById('confirm-password-error');
const getGender = document.querySelectorAll('input[name=gender]');
const ageErrorDisplay = document.getElementById('age-error');

const registerBtn = document.getElementById('register');
const getForm = document.querySelector('.registration-card');
const agreeBtn = document.getElementById('agree');

let fnameValid = lnameValid = unameValid = pass1Valid = pass2Valid = dobValid = genderValid = agreeValid = false;

getFName.addEventListener('keyup', () => {
    const nameRegex = /^[a-zA-Z ]+$/;
    const fName = getFName.value;
    if (!nameRegex.test(fName)) {
        fNameErrorDisplay.innerHTML = 'First Name should be alphabetical';
        return false;
    }
    else
        fNameErrorDisplay.innerHTML = '';
    console.log(getFName.value);
    if (getFName.value == '')
        fNameErrorDisplay.innerHTML = '';
    fnameValid = true;
    shallEnableChecker();
});

getLName.addEventListener('keyup', () => {
    const nameRegex = /^[a-zA-Z ]+$/;
    const lName = getLName.value;
    if (!nameRegex.test(lName)) {
        lNameErrorDisplay.innerHTML = 'Last Name should be alphabetical';
        return false;
    }
    else
        lNameErrorDisplay.innerHTML = '';
    if (getLName.value === '')
        LNameErrorDisplay.innerHTML = '';
    lnameValid = true;
    shallEnableChecker();
});

// User Name Validation - At least 6 characters, no special characters

getUName.addEventListener('keyup', () => {
    let error = '';

    const uName = getUName.value;
    const uNameRegex = /^[a-zA-Z0-9]{6,}$/;

    if (uName.length < 6)
        error += 'User Name should be atleast 6 characters<br/>';
    if (!uNameRegex.test(uName))
        error += 'User Name should be alphanumeric<br/>';

    if (error) {
        uNameErrorDisplay.innerHTML = error;
        return false;
    }
    else
        uNameErrorDisplay.innerHTML = '';
    if (uName.value === '')
        uNameErrorDisplay.innerHTML = '';
    unameValid = true;
    shallEnableChecker();
});

for (const eachGender of getGender) {
    eachGender.addEventListener('change', () => {
        if (eachGender.checked) {
            // console.log(eachGender.value);
            genderValid = true;
            shallEnableChecker();
        }
    });
}

getDob.addEventListener('change', () => {
    const dob = new Date(getDob.value);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    let age = ageDate.getUTCFullYear() - 1970;
    getAge.value = age > 0 ? age : 0;
    if (getAge.value < 16) {
        ageErrorDisplay.innerHTML = 'You must be atleast 16';
        registerBtn.disabled = true;
        return false;
    }
    else
        ageErrorDisplay.innerHTML = '';
    dobValid = true;
    shallEnableChecker();
});



// Password - At least 8 characters, atleast one special character and one number

getPassword1.addEventListener('keyup', () => {
    let errorMsg = '';
    const password = getPassword1.value;
    const alphaRegexp = new RegExp('[a-zA-Z]', 'g');
    const numericRegexp = new RegExp('[0-9]', 'g');
    const specialRegexp = new RegExp('[^a-zA-Z0-9 ]', 'g');
    let specialCharacterCount = 0;
    let numericCount = 0;
    let alphaCount = 0;
    for (let match of password.matchAll(alphaRegexp))
        alphaCount++;
    for (let match of password.matchAll(numericRegexp))
        numericCount++;
    for (let match of password.matchAll(specialRegexp))
        specialCharacterCount++;

    if(getPassword2.value && (getPassword1.value !== getPassword2.value)) {
        password2ErrorDisplay.innerHTML = 'Passwords do not match';
        registerBtn.disabled = true;
        return false;
    }
    else
        password2ErrorDisplay.innerHTML = '';

    if (password.length > 7 && alphaCount > 0 && numericCount > 0 && specialCharacterCount > 0) {
        password1ErrorDisplay.innerHTML = '';
        getPassword2.disabled = false;
        getPassword2.style.background = 'none';
        pass1Valid = true;
    }
    else {
        if (password.length < 8)
            errorMsg += 'Password should be atleast 8 characters<br>';
        if (alphaCount == 0)
            errorMsg += 'Password should contain atleast one alphabet<br>';
        if (numericCount == 0)
            errorMsg += 'Password should contain atleast one numeric value<br>';
        if (specialCharacterCount == 0)
            errorMsg += 'Password should contain atleast one special character<br>';
        password1ErrorDisplay.innerHTML = errorMsg;
        getPassword2.disabled = true;
        getPassword2.background = 'rgba(97, 95, 95, 0.2)';
        return false;
    }
    if (getPassword1.value === '')
        password1ErrorDisplay.innerHTML = '';
    shallEnableChecker();
});

getPassword2.addEventListener('keyup', () => {
    if (getPassword1.value != getPassword2.value) {
        password2ErrorDisplay.innerHTML = 'Passwords do not match';
        registerBtn.disabled = true;
        return false;
    }
    else
        password2ErrorDisplay.innerHTML = '';
    if (getPassword2.value === '')
        password2ErrorDisplay.innerHTML = '';
    pass2Valid = true;
    shallEnableChecker();
});

agreeBtn.addEventListener('change', () => {
    if (agreeBtn.checked)
        agreeValid = true;
    else
        agreeValid = false;
    shallEnableChecker();
})

// Age - At least 16 years old

const shallEnableChecker = () => {
    // console.log(genderValid);
    if (fnameValid && lnameValid && unameValid && pass1Valid && pass2Valid && dobValid && genderValid && agreeValid)
        registerBtn.disabled = false;
    else
        registerBtn.disabled = true;
}

getForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validation();
});


const validation = () => {
    let p1 = document.userDetails.password;
    let p2 = document.userDetails.confirmPassword;
    let age = document.userDetails.age;

    let msg = '';

    if (p1.value !== p2.value)
        msg += 'Passwords do not match';

    if (age.value <= 0)
        msg += 'Invalid Age';

    confirm(msg);
}
