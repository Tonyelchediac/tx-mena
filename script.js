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
    "details": "Here are more details about TX-MENA:\n\nWe specialize in crafting tailored software solutions that empower businesses to thrive in the digital age. Our team of experts combines innovation with expertise to deliver scalable and reliable products. Whether you're looking to build a custom application, migrate to the cloud, or optimize your existing systems, we have the tools and talent to make it happen. Our mission is simple: to help businesses achieve their goals through technology. We believe that every challenge is an opportunity to innovate, and we're committed to delivering solutions that exceed expectations.\n\nFeel free to ask me more about me.",
    "pricing": "Our pricing depends on the project you want to bring to life. For a website, it depends on how much time it will take for designing, coding, and testing.\nIn general, we're using this formula: (design-time/h + coding-time/h) x price per hour.\nWe can provide a more detailed estimate once we understand your project requirements.\n\nYou can contact our support team at info.txmena@gmail.com.",
    "support": "You can contact our support team at info.txmena@gmail.com.",
    "website": "A website is a collection of web pages accessible via the internet. Building a website typically involves several steps:\n\n1. **Planning** - Define the purpose and target audience.\n2. **Designing** - Create wireframes and visual designs.\n3. **Development** - Use HTML, CSS, and JavaScript for frontend; backend technologies like PHP, Node.js, or Python for functionality.\n4. **Testing** - Check for bugs, responsiveness, and performance.\n5. **Deployment** - Host the website on a server and make it live.\n6. **Maintenance** - Regularly update and improve the website.\n\nLet me know if you need help in building one!"
};

const keywordCollections = {
    "greeting": ["hello", "hey", "greetings"],
    "details": ["details", "information", "about"],
    "pricing": ["price", "budget", "pricing", "cost", "fees", "rates"],
    "support": ["support", "help", "assistance", "contact", "aid", "service", "guidance", "customer service", "technical support", "inquiry"],
    "website": ["website", "web development", "web", "web design", "build site", "create website", "information about website"]
};

sendButton.addEventListener("click", function () {
    const userInput = inputField.value.trim().toLowerCase();
    if (!userInput) return;
    
    addMessage(userInput, "user");
    
    let matchedResponse = "Sorry, I didn't understand your request. Explain for me more.";
    
    for (const key in keywordCollections) {
        if (keywordCollections[key].some(keyword => userInput.includes(keyword))) {
            matchedResponse = responses[key];
            break;
        }
    }
    
    setTimeout(() => addMessage(matchedResponse, "ai"), 500);
    inputField.value = "";
});
});