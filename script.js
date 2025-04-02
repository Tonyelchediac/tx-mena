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
    }
    message.textContent = text;
    chatList.appendChild(message);

    // Ensure scrolling to the absolute bottom
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
    "hello": "Hello dear, how can I help you today? I'm here to assist you with any inquiries you may have.",
    "details": "We specialize in crafting tailored software solutions that empower businesses to thrive in the digital age. Our team of experts combines innovation with expertise to deliver scalable and reliable products. Whether you're looking to build a custom application, migrate to the cloud, or optimize your existing systems, we have the tools and talent to make it happen. Our mission is simple: to help businesses achieve their goals through technology. We believe that every challenge is an opportunity to innovate, and we're committed to delivering solutions that exceed expectations. If you have specific questions about our services or projects, feel free to ask!",
    "price": "Our pricing depends on the project you want to bring to life. For a website, it depends on how much time it will take for designing, coding, and testing. In general, we're using this formula: (design-time/h + coding-time/h) x price per hour. We can provide a more detailed estimate once we understand your project requirements.",
    "support": "You can contact our support team at info.txmena@gmail.com. We're here to help you with any issues or questions you may have. Don't hesitate to reach out!",
    "services": "We offer a wide range of services including web development, mobile app development, cloud solutions, and IT consulting. Our goal is to provide comprehensive support to help your business succeed in the digital landscape.",
    "portfolio": "You can view our portfolio on our website, where we showcase various projects we've completed for clients across different industries. This will give you a better idea of our capabilities and the quality of our work.",
    "team": "Our team consists of highly skilled professionals with diverse backgrounds in technology, design, and business. We believe in collaboration and continuous learning to stay ahead in the industry.",
    "contact": "For any inquiries, you can reach us through our contact form on the website or directly via email. We look forward to hearing from you!"
  };

  sendButton.addEventListener("click", function () {
      const userInput = inputField.value.trim().toLowerCase();
      if (!userInput) return;
      
      addMessage(userInput, "user");
      
      let matchedResponse = "Sorry, I didn't understand your request.";
      for (const keyword in responses) {
          if (userInput.includes(keyword)) {
              matchedResponse = responses[keyword];
              break;
          }
      }
      
      setTimeout(() => addMessage(matchedResponse, "ai"), 500);
      inputField.value = "";
  });
});
