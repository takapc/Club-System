const btn = document.getElementById("btn");
const root = document.getElementByID("root");
btn.addEventListener("click", () => {
    root.textContent = "Hello JS!";
    root.style.color = "red";
});
