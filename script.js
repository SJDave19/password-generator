document.addEventListener('DOMContentLoaded', () => {
    const lengthSlider = document.getElementById('length-slider');
    const lengthDisplay = document.getElementById('length-display');
    const generatedPassword = document.getElementById('generated-password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');
    const levelButtons = document.querySelectorAll('.level-btn');
    const options = {
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        symbols: document.getElementById('symbols')
    };

    let securityLevel = 'weak';

    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            levelButtons.forEach(b => b.classList.remove('bg-blue-500', 'text-white'));
            btn.classList.add('bg-blue-500', 'text-white');
            securityLevel = btn.id;
        });
    });

    lengthSlider.addEventListener('input', () => {
        lengthDisplay.textContent = lengthSlider.value;
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedPassword.value).then(() => {
            alert('Password copied to clipboard');
        });
    });

    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const password = generatePassword(length, securityLevel, options);
        generatedPassword.value = password;
    });

    function generatePassword(length, level, opts) {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const nums = '0123456789';
        const symb = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        let chars = '';
        if (opts.uppercase.checked) chars += upper;
        if (opts.lowercase.checked) chars += lower;
        if (opts.numbers.checked) chars += nums;
        if (opts.symbols.checked) chars += symb;
        
        if (!chars) return '';

        let password = '';
        for (let i = 0; i < length; i++) {
            const charIndex = Math.floor(Math.random() * chars.length);
            password += chars[charIndex];
        }
        
        return password;
    }

    // Generate an initial password with the default settings
    const initialPassword = generatePassword(12, securityLevel, options);
    generatedPassword.value = initialPassword;
});
