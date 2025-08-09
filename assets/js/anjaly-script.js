'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    }
  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form && form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Initialize EmailJS
(function() {
  // Replace with your EmailJS user ID
  emailjs.init({
    publicKey: "5HhctUggGA6uCOPc6",
    privateKey: ""
  });
})();

// Handle contact form submission
const contactForm = document.querySelector("[data-form]");
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Show sending state
    const formBtn = document.querySelector("[data-form-btn]");
    const originalBtnText = formBtn.innerHTML;
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Get form data
    const fullName = this.fullname.value;
    const email = this.email.value;
    const message = this.message.value;
    
    emailjs.send("service_9f455xo", "template_886zpyg", {
      from_name: fullName,
      from_email: email,
      message: message
    })
    .then(function() {
      // Show success message
      formBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Message Sent!</span>';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(function() {
        formBtn.innerHTML = originalBtnText;
        formBtn.disabled = false;
      }, 3000);
    })
    .catch(function(error) {
      // Show error message
      formBtn.innerHTML = '<ion-icon name="alert-outline"></ion-icon><span>Failed to send</span>';
      console.error("Email sending failed:", error);
      
      // Reset button after 3 seconds
      setTimeout(function() {
        formBtn.innerHTML = originalBtnText;
        formBtn.disabled = false;
      }, 3000);
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const animatableElements = document.querySelectorAll(".service-item, .project-item.active, .testimonials-item, .timeline-item");
    
    animatableElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate");
      }
    });
  };
  
  // Run animation check on load and scroll
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});

// Add hover effects for service items
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    this.style.transition = 'transform 0.3s ease-in-out';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add typing effect to name heading
const nameElement = document.querySelector('.sidebar-info .name');
if (nameElement) {
  const text = nameElement.textContent;
  nameElement.textContent = '';
  
  let i = 0;
  const typeWriter = function() {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect when sidebar is visible
  setTimeout(typeWriter, 500);
}

// Chatbot functionality
class PortfolioChatbot {
  constructor() {
    this.isOpen = false;
    this.knowledge = {
      personal: {
        name: "Anjaly Biju Thandel",
        title: "Data Analyst",
        location: "Nagpur, Maharashtra, India",
        email: "anjaly0420@gmail.com",
        about: "I'm a Data Analyst with 3 years of experience in analyzing large datasets, developing Power BI dashboards, and automating reporting workflows to reduce manual effort by 50%. I have proven expertise in analyzing complex datasets, building interactive Power BI/Tableau reports, and optimizing reporting pipelines."
      },
      experience: [
        {
          role: "Data Analyst",
          company: "SalVenturesTech",
          period: "August 2022 — Present",
          description: "Built and deployed 10+ dashboards (Power BI/Tableau) for departments like operations, HR, and sales, reducing manual reporting effort by 50%. Designed predictive models for forecasting business metrics, improving forecasting accuracy by 20%. Authored and optimized complex SQL queries, accelerating data processing by 40% and shortening report delivery time by 30%. Built scalable ETL workflows and worked with cross-functional teams to deploy analytical solutions."
        }
      ],
      skills: [
        "Python", "Pandas", "Numpy", "SQL", "MySQL", "Tableau", "Power BI", 
        "Advanced Excel", "Pivot Tables", "HLOOKUP", "VLOOKUP", "Business Analysis", 
        "Data Analysis", "Customer Acquisition", "Forecasting", "KPI Dashboards", 
        "Automation", "ETL Workflows", "SSMS", "DB2", "Excel Macros", "IoT Data Processing"
      ],
      projects: [
        {
          name: "Manufacturing Company Reporting System",
          category: "Dashboards",
          description: "Power BI dashboard system that reduced manual reporting efforts by 30% and increased production visibility by 35%"
        },
        {
          name: "Environmental Monitoring – Plant Room Analytics",
          category: "Analytics",
          description: "Analytics solution for environmental monitoring and plant room data analysis"
        },
        {
          name: "Ignition Inspire – High-Volume Data Pipeline",
          category: "Automation",
          description: "Processed and analyzed 27 million data records from IoT sources, reduced report delivery time by 40%, and built scalable dashboards"
        }
      ],
      certifications: [
        "IBM Data Analytics Certification",
        "IBM Data Visualization Certification",
        "PwC Switzerland's Power BI Certification"
      ],
      education: {
        degree: "Master of Science in Statistics",
        university: "Rashtrasant Tukadoji Maharaj Nagpur University",
        period: "2020 — 2022",
        location: "Nagpur"
      }
    };
    
    this.commonQuestions = {
      greeting: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      experience: ["experience", "work", "job", "career", "professional"],
      skills: ["skills", "technologies", "tech stack", "programming", "languages"],
      projects: ["projects", "work", "portfolio", "dashboards"],
      education: ["education", "university", "college", "degree", "study"],
      contact: ["contact", "email", "phone", "reach", "hire"],
      certifications: ["certifications", "certificates", "ibm", "pwc"],
      about: ["about", "who", "background", "story"]
    };
    
    this.init();
  }
  
  init() {
    this.createEventListeners();
  }
  
  createEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    
    if (toggle) toggle.addEventListener('click', () => this.toggleChatbot());
    if (close) close.addEventListener('click', () => this.closeChatbot());
    if (send) send.addEventListener('click', () => this.sendMessage());
    
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }
  }
  
  toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      if (container) {
        container.classList.add('active');
        this.isOpen = true;
        const input = document.getElementById('chatbot-input');
        if (input) input.focus();
      }
    }
  }
  
  closeChatbot() {
    const container = document.getElementById('chatbot-container');
    if (container) {
      container.classList.remove('active');
      this.isOpen = false;
    }
  }
  
  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addMessage(message, 'user');
    input.value = '';
    
    this.showTypingIndicator();
    
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
  }
  
  addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(typingContent);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
  
  generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.greeting)) {
      return `Hello! I'm here to help you learn about Anjaly Biju Thandel. You can ask me about her data analysis expertise, Power BI projects, statistical background, certifications, or anything else from her portfolio!`;
    }
    
    // Experience responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.experience)) {
      return `Anjaly is currently working as a Data Analyst at SalVenturesTech since August 2022. She has built and deployed 10+ dashboards using Power BI and Tableau, reducing manual reporting effort by 50%. She designs predictive models, optimizes SQL queries, and builds scalable ETL workflows for various departments.`;
    }
    
    // Skills responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.skills)) {
      return `Anjaly's technical skills include: Python, Pandas, Numpy, SQL, MySQL, Tableau, Power BI, Advanced Excel, VLOOKUP/HLOOKUP, Business Analysis, Data Analysis, Forecasting, KPI Dashboards, ETL Workflows, SSMS, DB2, and IoT Data Processing. She specializes in turning complex data into actionable business insights.`;
    }
    
    // Projects responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.projects)) {
      return `Anjaly has worked on several impactful projects including: Manufacturing Company Reporting System (reduced manual efforts by 30%), Environmental Monitoring Plant Room Analytics, and Ignition Inspire High-Volume Data Pipeline (processed 27 million IoT records). Her work focuses on dashboards, analytics, and automation.`;
    }
    
    // Education responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.education)) {
      return `Anjaly holds a Master of Science in Statistics from Rashtrasant Tukadoji Maharaj Nagpur University (2020-2022). Her strong statistical foundation enables her to design effective predictive models and perform advanced data analysis.`;
    }
    
    // Contact responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.contact)) {
      return `You can reach Anjaly at ${this.knowledge.personal.email}. She's based in ${this.knowledge.personal.location}. Feel free to use the contact form on this website or connect with her on LinkedIn!`;
    }
    
    // Certifications responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.certifications)) {
      return `Anjaly holds several professional certifications including: IBM Data Analytics Certification (comprehensive coverage of Python, SQL, and statistical analysis), IBM Data Visualization Certification (advanced dashboard design principles), and PwC Switzerland's Power BI Certification (professional business intelligence and reporting).`;
    }
    
    // About responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.about)) {
      return this.knowledge.personal.about + " She's passionate about solving business problems through data and improving decision-making with actionable insights.";
    }
    
    // Specific project queries
    if (lowerMessage.includes('manufacturing') || lowerMessage.includes('power bi')) {
      return "The Manufacturing Company Reporting System is one of Anjaly's key projects where she built Power BI dashboards that reduced manual reporting efforts by 30% and increased production visibility by 35%. Her analytical skills made a significant impact on operational efficiency.";
    }
    
    if (lowerMessage.includes('ignition inspire') || lowerMessage.includes('iot')) {
      return "Ignition Inspire is Anjaly's high-volume data pipeline project where she processed and analyzed 27 million data records from IoT sources, reduced report delivery time by 40%, and built scalable dashboards. This showcases her expertise in handling large-scale data processing.";
    }
    
    // Current role specific
    if (lowerMessage.includes('data analyst') || lowerMessage.includes('salventures')) {
      return "At SalVenturesTech, Anjaly works as a Data Analyst building dashboards for operations, HR, and sales departments. She's improved forecasting accuracy by 20%, accelerated data processing by 40%, and collaborated with cross-functional teams to deploy analytical solutions.";
    }
    
    // Fallback responses
    const fallbacks = [
      "That's an interesting question! You can ask me about Anjaly's data analysis expertise, Power BI projects, statistical background, or her certifications. What would you like to know?",
      "I'd be happy to help! Try asking about her current role at SalVenturesTech, her data visualization skills, or her experience with large datasets.",
      "Feel free to ask me about Anjaly's professional background in data analysis, her Power BI and Tableau expertise, or any specific projects you're curious about!",
      "I can tell you about Anjaly's career in data analysis, her dashboard development work, her statistical education, or her technical expertise. What interests you most?"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  matchesKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }
}

// Theme toggle functionality
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.setupEventListeners();
  }

  setupEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    // Update toggle button state
    this.updateToggleButton();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  updateToggleButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('title', 
        this.currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }
}

// Initialize theme manager and chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize chatbot
  new PortfolioChatbot();
});
