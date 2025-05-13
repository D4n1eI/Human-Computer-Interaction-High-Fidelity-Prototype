const sendButton = document.getElementById("send");
const messageInput = document.getElementById("message");
const interactionDiv = document.getElementById("user-ai-interaction");
const defaultHeader = document.getElementById("default-header");

function handleMessage() {
    const message = messageInput.value.trim().toLowerCase();

    if (message === "what are the best times to study?") {
        interactionDiv.innerHTML = `
            <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
                <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">What are the best times to study?</div>
                <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle img-fluid">
            </div>
            <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
                <img src="../assets/icons/pixel.png" style="position: relative;" width="50" class="rounded-circle img-fluid">
                <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">The best times to study are usually when you feel most alert and focused. For many people, this is in the morning after a good night's sleep, or in the early evening when energy levels are still stable. The key is to find a consistent time that fits your personal routine and avoid distractions during that period.</div>
            </div>
            `;

        defaultHeader.style.display = "none";

        messageInput.value = "";
    } else if (message === "can you please explain what the gradient vector represents in multivariable calculus?") {
    
    }
}

sendButton.addEventListener("click", handleMessage);

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleMessage();
    }
});