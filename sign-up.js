import { auth, createUserWithEmailAndPassword, db, ref, set } from './firebase.js';

$(document).ready(() => {
  $('button').on('click', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const DoB = document.getElementById('DoB').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value

    const userData = {
      FirstName: firstName, LastName: lastName,
      DateOfBirth: DoB, Email: email, Password: password
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userKey = user.uid;
        // save into db
        set(ref(db, 'Users/' + userKey), userData)
          .then(() => {
            localStorage.setItem('email', email);
            window.location.href = "birthday.html";
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage)
      });

  })

})