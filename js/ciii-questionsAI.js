const sendButton = document.getElementById("send");
const messageInput = document.getElementById("message");
const interactionDiv = document.getElementById("user-ai-interaction");
const defaultHeader = document.getElementById("default-header");

function handleMessage() {
    const message = messageInput.value.trim().toLowerCase();
    if (message === "can you please explain what the gradient vector represents in multivariable calculus?") {
        interactionDiv.innerHTML = `
            <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
                <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">Can you please explain what the gradient vector represents in multivariable calculus?</div>
                <img src="../assets/icons/user.png" style="position: relative;">
            </div>
            <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
                <img src="../assets/icons/pixel.png" style="position: relative;">
                <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">The gradient vector represents the direction and rate of the steepest increase of a scalar function. It points in the direction where the function increases most rapidly and its magnitude corresponds to the rate of change in that direction.</div>
            </div>
            `;
        
        defaultHeader.style.display = "none";

        messageInput.value = "";
    }
}

sendButton.addEventListener("click", handleMessage);

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleMessage();
    }
});