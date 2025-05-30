import { inputArea, results, startContent, chatContent, chatHistory } from './domElements.js';
import { sanitizeInput, jsonEscape, typeEffect } from './utils.js';

function appendToHistory(question, callback) {
    const historyLi = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-message";
    historyLi.appendChild(icon);
    historyLi.appendChild(document.createTextNode(question));
    historyLi.addEventListener("click", () => callback(question, false));
    chatHistory.appendChild(historyLi);
}

function renderTitle(question) {
    const titleDiv = document.createElement("div");
    titleDiv.className = "resultTitle";

    const titleImg = document.createElement("img");
    titleImg.src = "https://www.stelonbiotech.com/wp-content/uploads/2024/09/depositphotos_75217473-stock-photo-science-laboratory-test-tubes-150x150.webp";

    const titleText = document.createElement("p");
    titleText.textContent = question;

    titleDiv.appendChild(titleImg);
    titleDiv.appendChild(titleText);
    results.appendChild(titleDiv);
}

function showLoading() {
    const resultData = document.createElement("div");
    resultData.className = "resultData";
    resultData.innerHTML = `
        <img src="https://www.benmvp.com/images/post/how-to-create-circle-svg-gradient-loading-spinner/loading-spinner-final.svg"/>
        <div class="loader">
            <div class="animatedBG"></div>
            <div class="animatedBG"></div>
            <div class="animatedBG"></div>
        </div>`;
    results.appendChild(resultData);
}

function renderResponse(rawResponse) {
    const escaped = jsonEscape(rawResponse);
    const segments = escaped.split("**");
    let formatted = "";

    segments.forEach((item, index) => {
        formatted += index % 2 === 0
            ? item
            : `<strong>${item.split(" ").join("&nbsp;")}</strong>`;
    });

    const resultResponse = document.createElement("div");
    resultResponse.className = "resultResponse";

    const responseImg = document.createElement("img");
    responseImg.className = "thumbnail";
    responseImg.src = "https://www.stelonbiotech.com/wp-content/uploads/2024/09/depositphotos_75217473-stock-photo-science-laboratory-test-tubes-150x150.webp";

    const responseText = document.createElement("p");
    responseText.id = "typeEffect";

    resultResponse.appendChild(responseImg);
    resultResponse.appendChild(responseText);
    results.appendChild(resultResponse);

    formatted.split(" ").forEach((word, index) => {
        typeEffect(index, word + " ");
    });
}

export function getRagResponse(question, appendHistory) {
    const sanitizedQuestion = sanitizeInput(question);

    if (appendHistory) appendToHistory(sanitizedQuestion, getRagResponse);

    // Reset UI
    results.innerHTML = "";
    inputArea.value = "";
    startContent.style.display = "none";
    chatContent.style.display = "block";

    renderTitle(sanitizedQuestion);
    showLoading();

    fetch("http://127.0.0.1:3000/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: sanitizedQuestion })
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            document.querySelector(".results .resultData")?.remove();

            if (data && data.response) {
                renderResponse(data.response);
            } else {
                results.innerHTML += `<p>Error: No valid response data received</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            results.innerHTML += `<p>Error: There was an issue fetching the response</p>`;
        });
}
