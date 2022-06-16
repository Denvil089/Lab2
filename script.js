let data;
let error;
document.addEventListener("DOMContentLoaded", () => {
    const load = document.getElementById("load");
    const button = document.getElementById("button");
    const form = document.getElementById("form");
    form.addEventListener("submit", async e => {
        error = "";
        load.style.display = "inline";
        button.disabled = true;
        e.preventDefault();
        const input = document.getElementById("input");
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=7&orderBy=relevance&q=${input.value}`);
            data = await response.json();
        } catch (e) {
            error = `Error (( ${e.message}`;
        }
        load.style.display = "none";
        button.disabled = false;
        render();
    })
});

function render() {
    if (error) {
        const e = document.getElementById("e");
        e.innerText = error;
        return;
    }
    const list = document.getElementById("list");
    let result = "";
    for (let item of data.items) {
        result += `<li> <b>${item.volumeInfo.title}</b><br>`;
        if (item.volumeInfo.authors) {
            result += `<i>${item.volumeInfo.authors.join(" ")}</i><br/>`;
        }
        result += `${item.volumeInfo.description ? item.volumeInfo.description.substr(0, 400) : ""}
        </li>`;
    }
    list.innerHTML = result;
}