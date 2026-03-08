// Registration Form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      document.getElementById("ack").innerText = "✅ Registration successful! Confirmation email sent.";

      // EmailJS integration
      emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
        name: form[0].value,
        email: form[1].value,
        college: form[2].value
      }).then(() => {
        console.log("Email sent!");
      });
    });
  }
});

// Visitor Tracking (Firebase)
const totalVisitors = document.getElementById("totalVisitors");
const currentVisitors = document.getElementById("currentVisitors");

// Example: Firebase setup (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const visitorsRef = db.ref("visitors");

// Increment total visitors
visitorsRef.child("total").transaction(n => (n||0)+1);

// Track current visitors
const myRef = visitorsRef.child("current").push(true);
myRef.onDisconnect().remove();

visitorsRef.child("total").on("value", snap => totalVisitors.innerText = snap.val());
visitorsRef.child("current").on("value", snap => currentVisitors.innerText = snap.numChildren());
