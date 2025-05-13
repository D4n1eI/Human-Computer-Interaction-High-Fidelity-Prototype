const sendButton = document.getElementById("send");
const messageInput = document.getElementById("message");
const interactionDiv = document.getElementById("user-ai-interaction");

function handleMessage() {
    const message = messageInput.value.trim().toLowerCase();
    if (message === "ooga booga") {
        interactionDiv.innerHTML = "<p><strong>You said:</strong> ooga booga</p><p><em>AI:</em> Spooky response activated 👻</p>";
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
