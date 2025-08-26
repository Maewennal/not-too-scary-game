const phrases = [
  "Don't look behind you...",
  "Something is watching you right now...",
  "You feel a shadow pass just behind your shoulder...",
  "The air around you suddenly feels colder...",
  "You hear footsteps that stop when you move...",
  "Someone or something is waiting in the dark...",
  "You feel a gaze piercing through your back...",
  "A whisper says your name, but you're alone...",
  "The lights flicker as if warning you...",
  "You sense movement just beyond your vision...",
  "Don't turn around, it knows you're here...",
  "A sudden chill runs down your spine...",
  "Something is breathing where there should be nothing...",
  "Your reflection in the mirror is moving on its own...",
  "A shadow darts across the corner of your eye...",
  "You hear a soft knock... then silence...",
  "The darkness seems to thicken around you...",
  "Something just touched your shoulder... or did it?",
  "You feel eyes on you, but the room is empty...",
  "A faint laugh echoes, but you didn’t move..."
];

const loginBtn = document.getElementById('login-btn');
const pseudoInput = document.getElementById('pseudo');
const loginScreen = document.getElementById('login-screen');
const app = document.getElementById('app');
const welcome = document.getElementById('welcome');
const bouton = document.getElementById('btn');
const resultat = document.getElementById('resultat');
const eyes = document.getElementById("eye");
const logoutBtn = document.getElementById("logout-btn");

loginBtn.addEventListener('click', function() {
  const pseudo = pseudoInput.value.trim();
  if (pseudo) {
    welcome.textContent = `Welcome, ${pseudo}...`;
    loginScreen.style.display = 'none';
    app.style.display = 'block';
    localStorage.setItem('pseudo', pseudo);
  } else {
    alert("Enter your name first !");
  }
});

window.addEventListener('load', function() {
  const savedPseudo = localStorage.getItem('pseudo');
  if (savedPseudo) {
    welcome.textContent = `You dared coming back, ${savedPseudo}...`;
    loginScreen.style.display = 'none';
    app.style.display = 'block';
  }
});

function typeWriter(text, element, delay = 50) {
  element.textContent = "";
  const chars = text.split("");
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += chars[i];
    i++;
    if (i >= chars.length) clearInterval(interval);
  }, delay);
}

let typingInterval;
let hideTimeout;

bouton.addEventListener('click', function() {
  const index = Math.floor(Math.random() * phrases.length);
  const text = phrases[index];
  resultat.style.opacity = 1;
  resultat.textContent = "";

  if (typingInterval) clearInterval(typingInterval);
  if (hideTimeout) clearTimeout(hideTimeout);

  let i = 0;
  typingInterval = setInterval(() => {
    resultat.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);

      hideTimeout = setTimeout(() => {
        resultat.style.opacity = 0;
      }, 7000);
    }
  }, 70);
});


document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

setInterval(() => {
  document.body.classList.add("lightning");
  setTimeout(() => document.body.classList.remove("lightning"), 1000);
}, Math.random() * 8000 + 5000);

function showEyes() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  eyes.style.left = x + "px";
  eyes.style.top = y + "px";
  eyes.style.opacity = 1;
  setTimeout(() => {
    eyes.style.opacity = 0;
  }, 2000);
}

setInterval(() => {
  if (Math.random() > 0.5) showEyes();
}, Math.random() * 15000 + 10000);

logoutBtn.addEventListener("click", function() {
  localStorage.removeItem("pseudo");
  app.style.display = "none";
  loginScreen.style.display = "flex";
  pseudoInput.value = "";
});
