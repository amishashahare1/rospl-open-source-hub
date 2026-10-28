
interface Contribution {
    id: number;
    description: string;
}

const form = document.getElementById(
    "contributionForm"
) as HTMLFormElement;

const input = document.getElementById(
    "contribution"
) as HTMLInputElement;

const list = document.getElementById(
    "contributionList"
) as HTMLUListElement;

const totalCount = document.getElementById(
    "totalCount"
) as HTMLElement;

const emptyMessage = document.getElementById(
    "emptyMessage"
) as HTMLElement;

let contributions: Contribution[] = [];

try {
    const savedData: string | null =
        localStorage.getItem("rosplContributions");

    if (savedData) {
        contributions = JSON.parse(savedData) as Contribution[];
    }
} catch {
    contributions = [];
}

function renderContributions(): void {
    list.replaceChildren();

    contributions.forEach((item: Contribution) => {
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
            contributions = contributions.filter(
                (contribution) => contribution.id !== item.id
            );

            saveContributions();
            renderContributions();
        });

        li.append(description, deleteButton);
        list.appendChild(li);
    });

    totalCount.textContent = String(contributions.length);
    emptyMessage.hidden = contributions.length > 0;
}

function saveContributions(): void {
    localStorage.setItem(
        "rosplContributions",
        JSON.stringify(contributions)
    );
}

form.addEventListener("submit", (event: SubmitEvent) => {
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
