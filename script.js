import { months, categories } from "./constant.js";
import { renderMails, showModal,renderCategories } from "./ui.js";

// get item from localstorage
const strMailData = localStorage.getItem("data");

const mailData = JSON.parse(strMailData);

//! from html
const hamburgerMenu = document.querySelector(".menu");
const navigation = document.querySelector("nav");
const mailsArea = document.querySelector(".mails-area");
const createMailBtn = document.querySelector(".create-mail");
const modal = document.querySelector(".modal-wrapper");
const closeMailBtn = document.querySelector("#close-btn");
const form = document.querySelector("#create-mail-form");
const categoryArea = document.querySelector ("nav .middle");
const searchButton = document.querySelector ("#search-icon");
const searchInput= document.querySelector ("#search-input");

//! event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCategories(categoryArea,categories, "Inbox");

  renderMails(mailsArea, mailData);
  if (window.innerWidth < 1100) {
    navigation.classList.add("hide");
  } else {
    navigation.classList.remove("hide");
  }
});
//watch the window width
window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;
  if (width < 1100) {
    navigation.classList.add("hide");
  }
});

hamburgerMenu.addEventListener("click", handleMenu);

searchButton.addEventListener("click", searchMails);

//modal operations
createMailBtn.addEventListener("click", () => showModal(modal, true));
closeMailBtn.addEventListener("click", () => showModal(modal, false));
form.addEventListener("submit", sendMail);

//mail area clicks 
mailsArea.addEventListener("click", updateMail);

//sidebar area's clicks
categoryArea.addEventListener("click", watchCategory);
//! functions

// navigasyonu acip kapamaya yarayan toggle ı class list ile ekledik . hamburgermenuyu yukardan cekip tıklama ile ozelligi aktif ettik.
function handleMenu() {
  /* classList.toggle():
    parametre olarak verilen classı yoksa ekler varsa çıkarır. */
  navigation.classList.toggle("hide");
}

function getDate() {
  const dateArr = new Date().toLocaleDateString().split(".");
  const day = dateArr[1];
  const monthNumber = dateArr[0];
  const month = months[monthNumber - 1];

  return day + " " + month;
}

function sendMail(e) {
  e.preventDefault();

  const receiver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;
  // accessing inputs in the forms

  if (!receiver || !title || !message) {
    //notification
    Toastify({
      text: "please fill the form",
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus:true,
      duration: 3000,
      style: {
        background: "rgb(193,193,0)",
        borderRadius: "4px",
      },
    }).showToast();
    //it prevents the following codes from working
    return;
  }

  //create new mail object
  const newMail = {
    id: new Date().getTime(),
    sender: "Hasan",
    receiver,
    title,
    message,
    starred:false,
    date: getDate(),
  };
  mailData.unshift(newMail);

  //update storage
  const strData = JSON.stringify(mailData);

  localStorage.setItem("data", strData);

  //update screen
  renderMails(mailsArea, mailData);

  //close modal
  showModal(modal, false);

  //clean modal
  e.target[0].value = " ";
  e.target[1].value = " ";
  e.target[2].value = " ";
  //notification
  Toastify({
    text: "Your email successfully sent",
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus:true,
    duration: 3000,
    style: {
      background: "#7CFC00",
      color: "white",
      borderRadius: "4px",
    },
  }).showToast();
}


// it will work when u are click mails area
function updateMail(e){

  // find mail for update
  const mail = e.target.parentElement.parentElement;
  //find id for mail data
  const mailId = mail.dataset.id;


  // it works when click delete button 
  if (e.target.id ===  'delete') {
    //remove item from array with array
    const filtredData = mailData.filter((i)=>i.id != mailId);

    // array to string
    const strData = JSON.stringify(filtredData);

    // send to localstorage
    localStorage.setItem('data',strData);
    

    // delete mail from html
    mail.remove();
    
  }

  // starts working when star is clicked
  if(e.target. id === 'star'){
    
    // find object with id
    const foundItem = mailData.find((i) => i.id == mailId);

    // change the starred value 
    const updateItem = {...foundItem,starred: !foundItem.starred };
    

    // find order number
    const index = mailData.findIndex((i) =>i.id == mailId);

    mailData[index] = updateItem;
    // spread > dağıtma işlemi (...object name)

    //transfer updated array to localstorage
    localStorage.setItem("data",JSON.stringify(mailData));


    renderMails(mailsArea, mailData);
  }
}

// watch categories and change

function watchCategory(e) {
  const selectedCategory = e.target.dataset.name;

  //update to navigation area
  renderCategories(categoryArea,categories,selectedCategory);

  if(selectedCategory === "Starred") {
    const filtred = mailData.filter((i)=> i.starred === true);

    renderMails(mailsArea,filtred);
    
    return;
  }

  renderMails(mailsArea,mailData);
}

//search mails
function searchMails(){

  const filtred = mailData.filter((i)=>i.message.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  renderMails(mailsArea,filtred);
}