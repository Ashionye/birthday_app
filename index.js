import { auth, signInWithEmailAndPassword, db, ref, child, get } from './firebase.js';

$(document).ready(() => {
    $('button').on('click', (e) => {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#pwd').val();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userKey = user.uid;
                const dbRef = ref(db);
                get(child(dbRef, `Users/${userKey}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            let email = snapshot.val().Email;
                            localStorage.setItem('email', email);
                            window.location.href = 'birthday.html';
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert(errorMessage);
            });
    })

})