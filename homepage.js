// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc, query, where, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8raLuAJm3ZvL_hqwMto_tSZUdmujGFLY",
  authDomain: "login-3ca3a.firebaseapp.com",
  projectId: "login-3ca3a",
  storageBucket: "login-3ca3a.firebasestorage.app",
  messagingSenderId: "362234859360",
  appId: "1:362234859360:web:921d7a6fc28226502e5805",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (loggedInUserId) {
    console.log("Logged-in user ID:", loggedInUserId);

    const docRef = doc(db, "users", loggedInUserId);

    // Fetch User Details
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserFName").innerText = userData.firstName || "First Name not available";
          document.getElementById("loggedUserLName").innerText = userData.lastName || "Last Name not available";
          document.getElementById("loggedUserEmail").innerText = userData.email || "Email not available";
          document.getElementById("loggedUserVotes").innerText = userData.votes || 0;

          // Add link to vote button
          const voteButton = document.getElementById("voteBtn");
          voteButton.href = `payment.html?uid=${loggedInUserId}`;
        } else {
          console.log("No document found matching the ID");
        }
      })
      .catch((error) => {
        console.error("Error getting user document:", error);
      });
  } else {
    console.log("User ID not found in local storage");
    alert("You need to log in to view this page.");
    window.location.href = "index.html";
  }
});

// Logout Functionality with Confirmation
document.getElementById("logout").addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("loggedInUserId");
    signOut(auth)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error Signing out:", error);
      });
  }
});

// Copy Link Functionality
document.getElementById("copyLinkBtn").addEventListener("click", () => {
  const profileUrl = window.location.href;
  navigator.clipboard
    .writeText(profileUrl)
    .then(() => alert("Profile link copied to clipboard!"))
    .catch((err) => alert("Failed to copy: " + err));
});

// // Add functionality to copy the profile URL to clipboard
// document.getElementById("copyLinkBtn").addEventListener("click", () => {
//   const profileUrl = window.location.href; // Get current URL
//   navigator.clipboard
//     .writeText(profileUrl) // Copy URL to clipboard
//     .then(() => alert("Profile link copied to clipboard!"))
//     .catch((err) => alert("Failed to copy: " + err));
// });
