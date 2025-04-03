// header
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const targetSection = document.querySelector(this.hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    navLinks.classList.remove('active');
  });
});

document.addEventListener('click', (event) => {
  const isClickInsideNavLinks = navLinks.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideNavLinks && !isClickOnHamburger) {
    navLinks.classList.remove('active');
  }
});

// scroll smooth

document.querySelector(".scroll-to-contact").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".logo").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".scroll-to-project").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("#portfolio").scrollIntoView({ behavior: "smooth" });
});


// ai button
const aiOpenButton = document.querySelector(".ai-button");
const aiCloseButton = document.querySelector(".close-ai");
const aiContainer = document.querySelector('.ai-container');

aiOpenButton.addEventListener("click", () => {
  aiContainer.classList.add('active');
  document.body.style.overflow = "hidden";
});

aiCloseButton.addEventListener("click", () => {
  aiContainer.classList.remove('active');
  document.body.style.overflow = "";
});

// ai conversation
document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".ai-input");
    const sendButton = document.querySelector(".send-button");
    const aiOpenButton = document.querySelector(".ai-button");
    const chatList = document.querySelector(".ai-ul ul");

    function addMessage(text, sender) {
        const message = document.createElement("li");
        message.classList.add("message", sender);

        if (sender === "user") {
            message.style.backgroundColor = "gray";
            message.style.textAlign = "right";
        }
        message.innerHTML = text.replace(/\n/g, "<br>");

        chatList.appendChild(message);

        setTimeout(() => {
            const chatContainer = document.querySelector(".ai-ul");
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }

    let aiMessageDisplayed = false;
    aiOpenButton.addEventListener("click", function () {
        if (!aiMessageDisplayed) {
            addMessage("Hello dear, I'm TX-MENA AI. Feel free to ask more about the company and know more details!", "ai");
            aiMessageDisplayed = true;
        }
    });

    const responses = {
        "greeting": "Hello! How can I assist you today?",
        "details": "Here are more details about TX-MENA:\n\nWe specialize in crafting tailored software solutions that empower businesses to thrive in the digital age. Our team of experts combines innovation with expertise to deliver scalable and reliable products...",
        "pricing": "Our pricing depends on the project. It is calculated based on design, coding, and testing time...",
        "support": "You can contact our support team at info.txmena@gmail.com.",
        "website": "A website is a collection of web pages accessible via the internet. Building a website typically involves planning, designing, development, testing, and deployment..."
    };

    const keywordCollections = {
        "greeting": ["hello", "hey", "hi", "greetings"],
        "details": ["details", "information", "about tx", "about you", "more info", "company"],
        "pricing": ["price", "budget", "pricing", "cost", "fees", "rates", "how much", "charge", "payment"],
        "support": ["support", "help", "assistance", "contact", "aid", "service", "guidance", "customer service", "technical support", "inquiry"],
        "website": ["website", "web development", "web", "web design", "build site", "create website", "information about website", "how to make a website"]
    };

    function addTypingIndicator() {
        const typingMessage = document.createElement("li");
        typingMessage.classList.add("message", "ai");
        typingMessage.innerHTML = '<span class="typing-dots">.</span> <span class="typing-dots">.</span> <span class="typing-dots">.</span>';
        typingMessage.setAttribute("id", "typing-indicator");
        chatList.appendChild(typingMessage);

        // Add blinking effect
        const dots = typingMessage.querySelectorAll(".typing-dots");
        let blinkIndex = 0;
        const blinkInterval = setInterval(() => {
            dots.forEach(dot => dot.style.opacity = "0.3");
            dots[blinkIndex].style.opacity = "1";
            blinkIndex = (blinkIndex + 1) % dots.length;
        }, 500);

        typingMessage.setAttribute("blink-interval", blinkInterval);
    }

    function removeTypingIndicator() {
        const typingMessage = document.getElementById("typing-indicator");
        if (typingMessage) {
            clearInterval(typingMessage.getAttribute("blink-interval"));
            typingMessage.remove();
        }
    }

    sendButton.addEventListener("click", function () {
        const userInput = inputField.value.trim().toLowerCase();
        if (!userInput) return;

        addMessage(userInput, "user");

        let bestMatch = null;
        let maxMatches = 0;

        for (const key in keywordCollections) {
            let matchCount = keywordCollections[key].reduce((count, keyword) => 
                count + (userInput.includes(keyword) ? 1 : 0), 0);

            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = key;
            }
        }

        let matchedResponse = bestMatch ? responses[bestMatch] : "Sorry, I didn't understand your request. Can you explain more?";

        // Calculate dynamic typing delay (50ms per character, min 1s, max 4s)
        let typingDelay = Math.min(Math.max(matchedResponse.length * 50, 1000), 4000);

        addTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(matchedResponse, "ai");
        }, typingDelay);

        inputField.value = "";
    });

});
});