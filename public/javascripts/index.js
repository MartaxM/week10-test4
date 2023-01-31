if (document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("logout").style.display = "inline-block";
        document.getElementById("email").style.display = "inline-block";
        fetch("/api/private", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + authToken
            }
        })
            .then((response) => response.json())
            .then((email) => {
                document.getElementById("email").innerHTML = email.email;
            })
            .catch((e) => {
                console.log("error" + e)
            })
    } else {
        document.getElementById("login").style.display = "inline-block";
        document.getElementById("register").style.display = "inline-block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("email").style.display = "none";
    }
}

function logOut() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}