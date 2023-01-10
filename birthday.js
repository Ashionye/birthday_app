import { auth, signOut, db, ref, get, child } from './firebase.js';

$(document).ready(() => {
    const exitButton = document.getElementById('logDIV');
    const getB = document.getElementById('b-body');
    let email = localStorage.getItem('email');

    if (email) {
        exitButton.style.display = "block"; //display logout button

        // database access 
        const dbRef = ref(db);
        get(child(dbRef, 'Users')).then((snapshot) => {
            if (snapshot.exists()) {
                const allUsers = Object.values(snapshot.val());
                const currentUserDetails = allUsers.find(e => e.Email === email); // extract value as an array from an array of objects
                const firstName = currentUserDetails['FirstName'];
                const DoB = currentUserDetails['DateOfBirth'];
                const splitValues = DoB.split('-');

                const today = new Date();
                let bday = new Date(today.getFullYear(), splitValues[1] - 1, splitValues[2]);

                // calculate time left to birthday 
                function daysLeft(myBirthday, today) {
                    const ms2days = 1000 * 60 * 60 * 24;
                    if (today.getTime() > bday.getTime()) {
                        bday.setFullYear(bday.getFullYear() + 1);
                    }
                    const utcBday = Date.UTC(bday.getFullYear(), bday.getMonth(), bday.getDate());
                    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                    const diff = utcBday - utcToday;
                    const days = diff / ms2days;
                    return days;
                }

                const difference = daysLeft(bday, today);

                // functions to get quote
                const getQuotes = async (url) => {
                    try {
                        const response = await fetch(url, { cache: 'no-cache' });
                        if (response.ok) {
                            const jsonResponse = await response.json();
                            return (jsonResponse);
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                function displayQuotes(allQuotes) {
                    const length = allQuotes.length;
                    const randomNum = Math.floor(Math.random() * length);
                    const randomQuote = allQuotes[randomNum];
                    return randomQuote;
                }

                //insert in page
                if (today.getMonth() === bday.getMonth() && today.getDate() === bday.getDate()) {
                    const url = 'https://type.fit/api/quotes';
                    getQuotes(url)
                        .then((response) => {
                            const saying = displayQuotes(response);
                            const quoteText = saying['text'];
                            let quoteAuthour = saying['author'];
                            if (quoteAuthour == null) {
                                quoteAuthour = "Unknown"
                            }

                            getB.innerHTML = `
                                <div class="b-count">
                                    <h2>Happy Birthday,&nbsp${firstName}!</h2>
                                </div>
                                <div class="b-number">
                                    <p>"${quoteText}"</p>
                                    <em>${quoteAuthour}</em>
                                </div>
                            `;
                        });
                }
                else {
                    getB.innerHTML = `
                        <div class="b-count">
                            <h1>${difference} DAYS LEFT<H1>
                            <h3>UNTIL YOUR BIRTHDAY!</h3>
                        </div>
                    `;
                }

            }
            else {
                console.log("User data unavailable");
            }
        })
            .catch((error) => {
                console.error(error);
            });

        $('button').on('click', () => {
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    localStorage.removeItem('email');
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.log(error);
                });
        })
    }
    else {
        exitButton.style.display = "none";   // hide logout button
        getB.innerHTML = `
            <div class="b-count">
                <p><a href="index.html">Sign in</a> to view this page</p>
            </div>
        `;
    }

});
