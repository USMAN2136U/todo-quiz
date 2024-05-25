var firebaseConfig = {
    apiKey: "AIzaSyD2LwBmoqD6wDI7GEe_4wC8BA3wZc9YCyk",
    authDomain: "todoauth-85849.firebaseapp.com",
    projectId: "todoauth-85849",
    databaseURL: "https://todoauth-85849-default-rtdb.firebaseio.com",
    storageBucket: "todoauth-85849.appspot.com",
    messagingSenderId: "405028624494",
    appId: "1:405028624494:web:87464960114de07f366e7f"
  };
  var app = firebase.initializeApp(firebaseConfig);
var auth=firebase.authentication(app)
  
    
    function changeIcon() {
      var PasswordInput = document.getElementById("password");
      var img = document.getElementById("img");  
    
      if (PasswordInput.type === "password") {
        PasswordInput.type = "text";
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbXS4hk2KJnRZ4d2cvMOlY_5ERghJpZIBnvOGWCtR_g&s";
      } else {
        PasswordInput.type = "password";
        img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Eye_close_font_awesome.svg/2048px-Eye_close_font_awesome.svg.png";
      }
    }
    
    function validation() {
      var username = document.getElementById("username").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var cpassword = document.getElementById("cpassword").value;
      var mobileNo = document.getElementById("mobileNo").value;
    
      var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      var userCheck = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      var passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      var mobileCheck =
        /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    
      if (userCheck.test(username)) {
        document.getElementById("userError").innerHTML = "";
      } else {
        document.getElementById("userError").innerHTML = "** Invalid Username";
        return false;
      }
    
      if (emailCheck.test(email)) {
        document.getElementById("emailError").innerHTML = "";
      } else {
        document.getElementById("emailError").innerHTML = "** Invalid email";
        return false;
      }
    
      if (passwordCheck.test(password)) {
        document.getElementById("passwordError").innerHTML = "";
      } else {
        document.getElementById("passwordError").innerHTML = "** Invalid password";
        return false;
      }
    
      if (cpassword === password) {
        document.getElementById("cpasswordError").innerHTML = "";
      } else {
        document.getElementById("cpasswordError").innerHTML =
          "** Password not match";
        return false;
      }
    
      if (mobileCheck.test(mobileNo)) {
        document.getElementById("mobileError").innerHTML = "";
      } else {
        document.getElementById("mobileError").innerHTML =
          "** Invalid mobile number..";
        return false;
      }
    
      var obj = {
        username,
        mobileNo,
      };
    
      localStorage.setItem("obj", JSON.stringify(obj));
    
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              console.log("email sent..");
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
    
    function login() {
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
    
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          window.location = "index.html";
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (window.location.pathname !== "./index.html") {
          window.location = "./index.html";
        }
        console.log("user login...");
      } else {
        if (
          window.location.pathname !== "./login.html" &&
          location.pathname !== "./signup.html"
        ) {
          window.location = "./login.html";
        }
        console.log("not login...");
      }
    });
  
  
    function logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Logout successfully..");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    function forgetPassword() {
      var email = document.getElementById("email").value;
    
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log("password reset email sent..");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    }
    
    function loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
    
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorMessage);  
        });
    }
    
    function loginWithGithub() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
    
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = credential.accessToken;
    
          // The signed-in user info.
          var user = result.user;
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorMessage);
        });
    }


  function updateImageElement(imageUrl) {
    var imgElement = document.createElement("img");
    imgElement.style.width = "50px";
    imgElement.src = imageUrl;
    return imgElement;
  }
  
  var imageUrlInput = document.getElementById("imageUrlInput");
  imageUrlInput.addEventListener("input", function() {
    var imageUrl = imageUrlInput.value.trim();
    var imgElement = document.getElementById("dynamicImage");
  
    if (imageUrl) {
      if (!imgElement) {
        imgElement = updateImageElement(imageUrl);
        imgElement.id = "dynamicImage";
        document.body.appendChild(imgElement);
      } else {
        imgElement.src = imageUrl;
      }
    } else {
      if (imgElement) {
        imgElement.parentNode.removeChild(imgElement);
      }
    }
  });
  
  firebase.database().ref("todos").on("child_added", function(data) {
    var list = document.getElementById("list");
  
    var liElement = document.createElement("li");
    var imageUrl = data.val().imageUrl;
    var imgElement = null;
  
    if (imageUrl) {
      imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.style.width = "50px";
      imgElement.style.height = "50px";
      liElement.appendChild(imgElement);
    }
  
    var liText = document.createTextNode(data.val().todoValue);
    liElement.appendChild(liText);
  
    list.style.margin = "auto";
    list.style.width = "25%";
    list.style.fontSize = "18px";
    list.style.backgroundColor = "black";
    list.style.color = "white";
    list.appendChild(liElement);
  
    var delBtnELement = document.createElement("button");
    var delBtnText = document.createTextNode("delete");
    delBtnELement.appendChild(delBtnText);
    liElement.appendChild(delBtnELement);
    delBtnELement.style.backgroundColor = "blue";
    delBtnELement.style.color = "white";
    delBtnELement.onclick = function() {
      deleteItem(this);
    };
    delBtnELement.id = data.val().key;
  
    // Edit button creation
    var EditBtnELement = document.createElement("button");
    var EditBtnText = document.createTextNode("edit");
    EditBtnELement.appendChild(EditBtnText);
    liElement.appendChild(EditBtnELement);
    EditBtnELement.className = "editBtn";
    EditBtnELement.style.backgroundColor = "green";
    EditBtnELement.style.color = "white";
    EditBtnELement.id = data.val().key;
    EditBtnELement.onclick = function() {
      editItem(this);
    };
  });
  
  function addTodo() {
    var input = document.getElementById("todoInput");
    var imageUrlInput = document.getElementById("imageUrlInput");
  
    var id = Date.now().toString(31);
  
    var obj = {
      key: id,
      todoValue: input.value,
      imageUrl: imageUrlInput.value || null
    };
  
    firebase.database().ref("todos/" + id).set(obj);
  }
  
  function deleteAll() {
    firebase.database().ref("todos").remove();
    var list = document.getElementById("list");
    list.innerHTML = "";
  }
  
  function deleteItem(e) {
    firebase.database().ref("todos/" + e.id).remove();
    e.parentNode.remove();
  }
  
  function editItem(e) {
    var updateValue = prompt("Enter updated value..");
  
    firebase.database().ref("todos/" + e.id).set({
      key: e.id,
      todoValue: updateValue
    });
  
    e.parentNode.firstChild.nodeValue = updateValue;
  }
  