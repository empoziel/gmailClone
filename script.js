const hamburgerMenu = document.querySelector(".menu");
const navigation = document.querySelector("nav");

hamburgerMenu.addEventListener("click",handleMenu);

// navigasyonu acip kapamaya yarayan toggle ı class list ile ekledik . hamburgermenuyu yukardan cekip tıklama ile ozelligi aktif ettik.
function handleMenu(){
    /* classList.toggle():
    parametre olarak verilen classı yoksa ekler varsa çıkarır. */
    navigation.classList.toggle('hide');
}