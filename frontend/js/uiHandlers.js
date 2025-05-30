// js/uiHandlers.js
import {
    sideNavigation, sideBarToggle, startContentUl, inputArea,
    sendRequest, chatHistory, startContent, chatContent, results
} from './domElements.js';
import { promptQuestions } from './promptQuestions.js';
import { getRagResponse } from './api.js';

export function initializeUI() {
    window.addEventListener("load", () => {
        promptQuestions.forEach(data => {
            const item = document.createElement("li");
            item.addEventListener("click", () => getRagResponse(data.question, true));
            item.innerHTML = `
            <div class="promptSuggestion">
                <p>${data.question}</p>
                <div class="icon"><i class="${data.icon}"></i></div>
            </div>`;
            startContentUl.append(item);
            sendRequest.style.display = "none";
        });
    });

    sideBarToggle.addEventListener("click", () => {
        sideNavigation.classList.toggle("expandClose");
    });

    inputArea.addEventListener("keyup", (e) => {
        sendRequest.style.display = e.target.value.length > 0 ? "inline" : "none";
    });

    sendRequest.addEventListener("click", () => {
        const question = inputArea.value.trim();
        if (question) {
            getRagResponse(question, true);
        }
    });


    inputArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevents newline in textarea if it's a multiline input
        const question = inputArea.value.trim();
        if (question) {
            getRagResponse(question, true);
        }
    }
});
}

export function newChat() {
    startContent.style.display = "block";
    chatContent.style.display = "none";
}