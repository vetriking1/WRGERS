import './loginstyle.css'
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAjdq8B3gQygcrL7DLeF41tYj-XGvkEJNU",
    authDomain: "wargers-b122d.firebaseapp.com",
    databaseURL: "https://wargers-b122d-default-rtdb.firebaseio.com",
    projectId: "wargers-b122d",
    storageBucket: "wargers-b122d.appspot.com",
    messagingSenderId: "508499934891",
    appId: "1:508499934891:web:92da7bd69de8552a5681ee",
    measurementId: "G-BVPSZDFF4Y"   
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export function Login(){
    const [logined,setLogined] = useState(false)
    const [loginedword,setLoginedword] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get the username entered by the user
        const username = document.getElementById('userName').value;
        const userpassword = document.getElementById('exampleInputPassword1').value;
    
        // Create a Firestore query to find the document with the matching username
        const q = query(collection(db, 'data'), where('name', '==', username));
        if (logined)
            setLoginedword("Logedin")

        try {
          const querySnapshot = await getDocs(q);
    
          if (querySnapshot.docs.length === 1) {
            // If a document with the matching username is found, retrieve the email
            const userData = querySnapshot.docs[0].data();
            const userPassword = userData.Password;
            if (userpassword === userPassword)
                setLogined(true)
          } else {
            // Handle the case where no or multiple documents with the same username are found
            setLoginedword("password or username incorrect")
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      };
    return( <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <p>{loginedword}</p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>)
}