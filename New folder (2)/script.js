// ---------- Language Switcher (Beautiful Toggle) ----------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("langToggle");
  const portalTitle = document.getElementById("portalTitle");

  // Define both languages
  const translations = {
    hi: {
      title: "अपना मत पोर्टल",
      form6: "नया मतदाता पंजीकरण",
      form6desc: "यदि आपकी आयु 18 वर्ष या उससे अधिक है या कुछ महीनों में 18 वर्ष पूरी होगी तो फॉर्म 6 भरें।",
      form8: "प्रविष्टियों का सुधार",
      form8desc: "EPIC विवरण अपडेट करें या PwD मार्किंग करें।",
      services: "सेवाएं",
    },
    en: {
      title: "Apna Mat Portal",
      form6: "New Voter Registration",
      form6desc: "Fill Form 6 if you are 18 years or above or will turn 18 soon.",
      form8: "Correction Of Entries",
      form8desc: "Update your EPIC details or mark as PwD.",
      services: "Services",
    },
  };

  let currentLang = localStorage.getItem("lang") || "hi";
  if (currentLang === "en") toggle.checked = true;
  applyLanguage(currentLang);

  toggle.addEventListener("change", () => {
    currentLang = toggle.checked ? "en" : "hi";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
  });

  function applyLanguage(lang) {
    const t = translations[lang];
    portalTitle.textContent = t.title;

    const elements = {
      form6Title: document.querySelector(".col-lg-6 .card:nth-child(1) .section-title"),
      form6Desc: document.querySelector(".col-lg-6 .card:nth-child(1) p"),
      form8Title: document.querySelector(".col-lg-6 .card:nth-child(2) .section-title"),
      form8Desc: document.querySelector(".col-lg-6 .card:nth-child(2) p"),
      servicesTitle: document.querySelector(".col-lg-6:nth-child(2) .card:nth-child(2) .section-title"),
    };

    if (elements.form6Title) elements.form6Title.textContent = t.form6;
    if (elements.form6Desc) elements.form6Desc.textContent = t.form6desc;
    if (elements.form8Title) elements.form8Title.textContent = t.form8;
    if (elements.form8Desc) elements.form8Desc.textContent = t.form8desc;
    if (elements.servicesTitle) elements.servicesTitle.textContent = t.services;
  }
});




// LOGIN SYSTEM 
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      const users = {
        'aditya@mail.com': { name: 'Aditya', password: 'ramram' },
        'akhilesh@mail.com': { name: 'Akhilesh', password: 'ramram' },
      };

      if (users[email] && users[email].password === password) {
        localStorage.setItem('loggedInUser', users[email].name);
        window.location.href = 'index.html'; // redirect to home
      } else {
        document.getElementById('loginMessage').textContent = 'Invalid Email or Password!';
      }
    });
  }

  //WELCOME ON INDEX PAGE
  const user = localStorage.getItem('loggedInUser');
  const loginArea = document.getElementById('loginArea');

  if (loginArea) {
    if (user) {
      loginArea.innerHTML = `
        <span class="text-white me-3">Welcome, <strong>${user}</strong></span>
        <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>
      `;
      document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
      });
    }
  }

  //  OTHER BUTTONS
 //  Redirect Buttons
if (document.getElementById('newVoterBtn')) {
  document.getElementById('newVoterBtn').onclick = () => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      window.location.href = 'form6.html'; // ✅ go to Form 6 when logged in
    } else {
      window.location.href = 'login.html'; // redirect to login if not logged in
    }
  };
}

if (document.getElementById('correctionBtn')) {
  document.getElementById('correctionBtn').onclick = () => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      alert('Redirecting to Form 8...');
    } else {
      window.location.href = 'login.html';
    }
  };
}

});

// Redirect to login if not logged in
if (window.location.pathname.includes("form6.html")) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  }
}

// Show logged-in user in form6 page
const userInfo = document.getElementById("userInfo");
const loggedUser = localStorage.getItem("loggedInUser");
if (userInfo && loggedUser) {
  userInfo.innerHTML = `
    <span class="me-3"><i class="bi bi-person-circle"></i> ${loggedUser}</span>
    <button class="btn btn-outline-light btn-sm" onclick="logout()">Logout</button>
  `;
}


// FORM 6 LOGIC
if (window.location.pathname.includes("form6.html")) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) window.location.href = "login.html";

  // show user info in header
  const userInfo = document.getElementById("userInfo");
  if (userInfo) {
    userInfo.innerHTML = `
      <span class="me-3"><i class="bi bi-person-circle"></i> ${user}</span>
      <button class="btn btn-outline-light btn-sm" onclick="logout()">Logout</button>
    `;
  }

  // section switching
  const nextBtn = document.getElementById("nextToB");
  const backBtn = document.getElementById("backToA");
  const sectionA = document.getElementById("sectionA");
  const sectionB = document.getElementById("sectionB");
  const navButtons = document.querySelectorAll("#formNav button");

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      sectionA.classList.add("d-none");
      sectionB.classList.remove("d-none");
      navButtons[0].classList.remove("active");
      navButtons[1].classList.add("active");
    });

  if (backBtn)
    backBtn.addEventListener("click", () => {
      sectionB.classList.add("d-none");
      sectionA.classList.remove("d-none");
      navButtons[1].classList.remove("active");
      navButtons[0].classList.add("active");
    });

  // dummy submit
  const formB = document.getElementById("formB");
  if (formB)
    formB.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form 6 submitted successfully ✅");
      window.location.href = "index.html";
    });
}


// ---------- FAQ Toggle ----------
const faqToggle = document.getElementById('faqToggle');
const faqContent = document.getElementById('faqContent');

if (faqToggle && faqContent) {
  faqToggle.addEventListener('click', () => {
    faqContent.classList.toggle('d-none');
    faqToggle.innerHTML = faqContent.classList.contains('d-none')
      ? 'Frequently Asked Questions →'
      : 'Frequently Asked Questions ↓';
  });
}

// ---------- Complaint & Suggestion Buttons ----------
if (document.getElementById("complaintBtn")) {
  document.getElementById("complaintBtn").onclick = () => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      window.location.href = "complaint.html";
    } else {
      alert("⚠️ Please login first to register a complaint.");
      window.location.href = "login.html";
    }
  };
}

if (document.getElementById("suggestionBtn")) {
  document.getElementById("suggestionBtn").onclick = () => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      window.location.href = "suggestion.html";
    } else {
      alert("⚠️ Please login first to share your suggestion.");
      window.location.href = "login.html";
    }
  };
}
