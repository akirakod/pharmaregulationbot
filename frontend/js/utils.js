// js/utils.js

// Formatting output response from gemini 2.0. Replacing double \n and single \n with break character
export function jsonEscape(str) {
    return str.replace(/\r?\n\n/g, "<br>").replace(/\r?\n/g, "<br>");
}

// Delayed typing effect output response from 2.0
export function typeEffect(index, nextWord) {
    setTimeout(() => {
        document.getElementById("typeEffect").innerHTML += nextWord;
    }, 75 * index);
}

// Remove potentially dangerous characters. Possible threats from script XSS/HTML threats
export function sanitizeInput(str) {
    
    return str.replace(/[<>&"'`]/g, function (char) {
        const charMap = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };
        return charMap[char] || char;
    }).trim();
}

