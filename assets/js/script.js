class Data {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class Form_Data extends Data {
    constructor(user, email, password, phone) {
        super(email, password);
        this.user = user;
        this.phone = Number(phone);
    }
}

let header;
let form1 = document.querySelector(".form1");
let form2 = document.querySelector(".form2");

form1.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    const data = new Data(email, password);
    header = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    };
    validateData(header);
});

form2.addEventListener("submit", (event) => {
    let user = document.querySelector(".user").value;
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    let phone = document.querySelector(".phone").value;
    console.log(phone);
    if(phone.length==10 ||(phone!="" && password!="" && email != "" && user != "")){
        console.log(user);
        const data = new Form_Data(user, email, password, phone);
        header = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        };
        sendData(header);
    }else{
        alert('Please give valid data');
    }
});

const validateData = async (header) => {
    try {
        const response = await fetch("server/login.php", header);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        if (result === "Login successful!") {
            window.location.href = "server/response/home.php";
        } else {
            alert(result);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const sendData = async (header) => {
    try {
        const response = await fetch("server/register.php", header);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        if (result === "Registered successfully") {
            window.location.href = "server/response/home.php";
        } else {
            alert(result);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
document.querySelector(".link-1").addEventListener('click',()=>{
    form1.style.display='none';
    form2.style.display='flex';
    document.title="Registeration form"
})
document.querySelector(".link-2").addEventListener('click',()=>{
    form1.style.display='flex';
    form2.style.display='none';
})