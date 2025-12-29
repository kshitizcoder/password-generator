const passwordDisplay = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const settings = document.querySelectorAll('.setting'); // Select all checkboxes

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// 1. Logic to ensure at least one checkbox is always selected
settings.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.setting:checked').length;
        if (checkedCount === 0) {
            checkbox.checked = true; // Re-check if it's the last one
        }
        generatePassword(); // Optional: Auto-generate on change
    });
});

// 2. Sync Slider with Text
lengthSlider.addEventListener('input', (e) => {
    lengthVal.innerText = e.target.value;
    generatePassword(); // Auto-update as you slide
});

// 3. Generator Core Logic
function generatePassword() {
    const length = +lengthSlider.value;
    let characters = '';
    let password = '';

    // Dynamically build character pool based on checked boxes
    settings.forEach(setting => {
        if (setting.checked) {
            characters += charSets[setting.id];
        }
    });

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordDisplay.innerText = password;

    // Responsive Font Sizing Logic for 1-50 chars
    if (length > 35) {
        passwordDisplay.style.fontSize = '0.9rem';
    } else if (length > 22) {
        passwordDisplay.style.fontSize = '1.1rem';
    } else {
        passwordDisplay.style.fontSize = '1.25rem';
    }
}

// 4. Copy Feature
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.innerText;
    navigator.clipboard.writeText(password).then(() => {
        const icon = copyBtn.querySelector('i');
        icon.className = 'fa-solid fa-check text-green-400 text-xl';
        setTimeout(() => {
            icon.className = 'fa-regular fa-copy text-xl text-white';
        }, 2000);
    });
});

// Initial load
generateBtn.addEventListener('click', generatePassword);
generatePassword();