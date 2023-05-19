let navbarBtn = document.querySelector(".navbar-btn")
let navbarMenu = document.querySelector(".navbar")

navbarBtn.addEventListener("click", ()=>{
    navbarBtn.classList.toggle("active");
    navbarMenu.classList.toggle("display-menu");
})
