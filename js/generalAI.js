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
                <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle">
            </div>
            <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
                <img src="../assets/icons/icon1colored.png" style="position: relative;" width="50" height="50" class="rounded-circle">
                <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">The best times to study are usually when you feel most alert and focused. For many people, this is in the morning after a good night's sleep, or in the early evening when energy levels are still stable. The key is to find a consistent time that fits your personal routine and avoid distractions during that period.</div>
            </div>
            `;

        defaultHeader.style.display = "none";

        messageInput.value = "";
    } else if (message === "can you please explain what the gradient vector represents in multivariable calculus?") {
    
    } else if (message === "can you please show me a picture of pixel?") {
        interactionDiv.innerHTML = `
            <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
                <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">Can you please show me a picture of Pixel?</div>
                <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle">
            </div>
            <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
                <img src="../assets/icons/icon1colored.png" style="position: relative;" width="50" height="50" class="rounded-circle">
                <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">
                    <img src="../assets/pixel/mybeloved.jpeg" alt="Pixel" >
                    <br><br>
                    <p>Here is a picture of Pixel. He is such a good boy!</p>
                </div>
            </div>
            `;

        defaultHeader.style.display = "none";

        messageInput.value = "";
    }else if (message === "who is the most precious and handsome boy?") {
        interactionDiv.innerHTML = `
            <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
                <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">who is the most precious and handsome boy?</div>
                <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle">
            </div>
            <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
                <img src="../assets/icons/icon1colored.png" style="position: relative;" width="50" height="50" class="rounded-circle">
                <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">
                    <img src="../assets/pixel/mybeloved2.jpeg" alt="Pixel" >
                    <br><br>
                    <p>Our beloved Pixel boy, of course!</p>
                </div>
            </div>
            `;

        defaultHeader.style.display = "none";

        messageInput.value = "";
    }else if (message === "who is pixel?") {
        interactionDiv.innerHTML = `
            <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
                <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">who is pixel?</div>
                <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle">
            </div>
            <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
                <img src="../assets/icons/icon1colored.png" style="position: relative;" width="50" height="50" class="rounded-circle">
                <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">
                    <img src="../assets/pixel/mybeloved3.jpeg" alt="Pixel" >
                    <br>A very handsome boy!<br>
                    <p></p>
                </div>
            </div>
            `;

        defaultHeader.style.display = "none";

        messageInput.value = "";
    }

    else if (message === "who is riscas?") {
    interactionDiv.innerHTML = `
        <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
            <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">who is riscas?</div>
            <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle">
        </div>
        <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
            <img src="../assets/icons/icon1colored.png" style="position: relative;" width="50" height="50" class="rounded-circle">
            <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">
                <img src="../assets/pixel/naughtyboy.jpeg" alt="Pixel" style="width: 120px; height: auto;">
                <br>A very naughty boy! He craves the chickens!!OHNOMNOMNOMNOMNOM<br>
                <p></p>
            </div>
        </div>
        `;

    defaultHeader.style.display = "none";
    messageInput.value = "";
}

 else if (message === "why is riscas a naughty boy?") {
    interactionDiv.innerHTML = `
        <div style="display: flex; align-items: right; justify-content: flex-end; margin-right: 20%;">
            <div class="speech-bubble-right" style="top: 25%;  margin-right: 2%;">why is riscas a naughty boy?</div>
            <img src="../assets/icons/user.png" style="position: relative;" width="50" height="50" class="rounded-circle">
        </div>
        <div style="display: flex; align-items: left; margin-left: 5%; margin-top: 1%;">
            <img src="../assets/icons/icon1colored.png" style="position: relative;" width="50" height="50" class="rounded-circle">
            <div class="speech-bubble-left" style="top: 25%; margin-left: 2%;">
                <img src="../assets/pixel/naughtyboycancelhim.jpeg" alt="Pixel" style="width: 120px; height: auto;">
                <br>He tried to grow catnip and sell it on the black market, the silly goober!<br>
                <p></p>
            </div>
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