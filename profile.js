import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8raLuAJm3ZvL_hqwMto_tSZUdmujGFLY",
  authDomain: "login-3ca3a.firebaseapp.com",
  projectId: "login-3ca3a",
  storageBucket: "login-3ca3a.firebasestorage.app",
  messagingSenderId: "362234859360",
  appId: "1:362234859360:web:921d7a6fc28226502e5805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and display user profile based on UID in URL
async function displayUserProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("uid");

  if (uid) {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        const profileDiv = document.getElementById("profile");

        profileDiv.innerHTML = `
          <h2>${user.firstName} ${user.lastName}</h2>
          <p><strong>Email:</strong> ${user.email || "Not provided"}</p>
          <p><strong>Votes:</strong> ${user.votes || 0}</p>
          <a class="button" href="payment.html?uid=${uid}">Vote &#x20A6;500 for 10 votes</a>
        `;
      } else {
        console.log("No such user!");
        const profileDiv = document.getElementById("profile");
        profileDiv.innerHTML = "<p>User not found.</p>";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to load user profile. Please try again later.");
    }
  } else {
    console.log("No UID found in URL.");
    alert("User ID is missing from the URL.");
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", displayUserProfile);
