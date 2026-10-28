"use strict";
const form = document.getElementById("contributionForm");
const input = document.getElementById("contribution");
const list = document.getElementById("contributionList");
const totalCount = document.getElementById("totalCount");
const emptyMessage = document.getElementById("emptyMessage");
let contributions = [];
try {
    const savedData = localStorage.getItem("rosplContributions");
    if (savedData) {
        contributions = JSON.parse(savedData);
    }
}
catch {
    contributions = [];
}
function renderContributions() {
    list.replaceChildren();
    contributions.forEach((item) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center gap-2";
        const description = document.createElement("span");
        description.textContent = item.description;
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-sm btn-outline-danger";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            contributions = contributions.filter((contribution) => contribution.id !== item.id);
            saveContributions();
            renderContributions();
        });
        li.append(description, deleteButton);
        list.appendChild(li);
    });
    totalCount.textContent = String(contributions.length);
    emptyMessage.hidden = contributions.length > 0;
}
function saveContributions() {
    localStorage.setItem("rosplContributions", JSON.stringify(contributions));
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const description = input.value.trim();
    if (!description) {
        return;
    }
    contributions.push({
        id: Date.now(),
        description: description
    });
    saveContributions();
    renderContributions();
    form.reset();
    input.focus();
});
renderContributions();
