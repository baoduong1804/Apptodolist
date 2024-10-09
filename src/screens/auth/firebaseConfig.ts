// firebaseConfig.ts
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Sử dụng Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAXclAIPCWZeT9a9g8cr_roriBBWkcSrIA",
  authDomain: "fir-auth-6ef43.firebaseapp.com",
  projectId: "fir-auth-6ef43",
  storageBucket: "fir-auth-6ef43.appspot.com",
  messagingSenderId: "953986298731",
  appId: "1:953986298731:web:499722672a4431a986122e",
  measurementId: "G-03LYZDTNZL"
};

// Kiểm tra xem Firebase đã được khởi tạo hay chưa
let app: FirebaseApp;

try {
  app = getApp(); // Nếu Firebase đã được khởi tạo, lấy app hiện tại
} catch (error) {
  app = initializeApp(firebaseConfig); // Nếu chưa, khởi tạo Firebase
}

// Lấy đối tượng auth
const auth = getAuth(app);
const db = getFirestore(app); // Lấy đối tượng Firestore
export { auth, db };
