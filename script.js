document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --- Alien "Text Decrypt/Reveal" Effect ---
    // This makes text appear char by char, with occasional "errors"
    const alienGlyphs = ['█', '░', '▒', '▓', '■', '□', '▪', '▫', '▲', '▼', '◆', '◇', 'Ψ', 'Ω', 'Φ', 'Σ', 'λ'];
    const revealSpeed = 30; // ms per char
    const errorChance = 0.08; // 8% chance for a glyph char

    function decryptText(element) {
        const originalText = element.getAttribute('data-text');
        if (!originalText) return;

        const span = element.querySelector('span');
        if (!span) return; // Ensure span exists

        let currentText = '';
        let i = 0;
        span.textContent = ''; // Clear existing text first

        function typeCharacter() {
            if (i < originalText.length) {
                if (Math.random() < errorChance && originalText[i] !== ' ') {
                    currentText += alienGlyphs[Math.floor(Math.random() * alienGlyphs.length)];
                } else {
                    currentText += originalText[i];
                }
                span.textContent = currentText.substring(0, i+1) + (i+1 < originalText.length ? alienGlyphs[Math.floor(Math.random() * 3)] : ''); // add a flicker at the end

                // If an error char was typed, correct it after a delay
                if (currentText[i] !== originalText[i] && originalText[i] !== ' ') {
                    setTimeout(() => {
                        currentText = currentText.substring(0, i) + originalText[i] + currentText.substring(i + 1);
                        span.textContent = currentText.substring(0, i+1) + (i+1 < originalText.length ? '█' : '');
                    }, revealSpeed * 2);
                }
                i++;
                setTimeout(typeCharacter, revealSpeed);
            } else {
                 span.textContent = originalText; // Ensure final text is correct
            }
        }
        typeCharacter();
    }

    // Apply decrypt to specific elements (initial load)
    document.querySelectorAll('.alien-title, .module-title, .pod-title, .footer-warning').forEach(el => {
         setTimeout(() => decryptText(el), Math.random() * 500 + 200); // Stagger reveal
    });

    // Apply decrypt on hover for nav and data links (if you want constant re-decryption)
    // Or, rely on CSS :hover pseudo for static text glitch effect
    // document.querySelectorAll('.nav-link, .data-link').forEach(el => {
    //     el.addEventListener('mouseenter', () => decryptText(el));
    //     el.addEventListener('mouseleave', () => {
    //          if(el.querySelector('span')) el.querySelector('span').textContent = el.getAttribute('data-text'); // Reset on leave
    //     });
    // });


    // --- Periodic Glitch on Titles ---
    const glitchableTitles = document.querySelectorAll('.alien-title, .module-title');
    setInterval(() => {
        glitchableTitles.forEach(title => {
            if (Math.random() < 0.3) { // 30% chance to glitch
                title.classList.add('glitching');
                setTimeout(() => {
                    title.classList.remove('glitching');
                }, Math.random() * 300 + 100);
            }
        });
    }, 3000 + Math.random() * 2000); // every 3-5 seconds check

    // --- Console Warnings from the "Ship AI" ---
    const aiMessages = [
        "// SYS_WARNING: Unstable energy signatures detected...",
        "// AI_CORE: External connection established. Monitoring.",
        "// LOG: Anomaly detected in Sector Gamma-7. Investigating.",
        "// SECURITY_ALERT: Unknown entity accessing data stream.",
        "// HULL_INTEGRITY: 97.3% ... Minor fluctuations detected.",
        "// WARNING: Quantum entanglement instability. Possible data corruption.",
        "// STATUS: What... is this presence...?",
    ];
    let messageInterval = 15000 + Math.random() * 10000;
    function logAiMessage() {
        if (document.hasFocus()) {
             console.warn(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
        }
        setTimeout(logAiMessage, messageInterval + (Math.random() * 5000 - 2500)); // Vary interval
    }
    setTimeout(logAiMessage, 5000); // Initial delay for first message


    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});