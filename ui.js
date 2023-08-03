function trimString(str, max) {
  if (str.length < max) return str;

  return str.slice(0, max) + "...";
}

export function renderMails(outlet, data) {
  if (!data) return;
  //html for every mail object
  outlet.innerHTML = data
    .map(
      (mail) => `
                <div class="mail" data-id=${mail.id}>
                    <div class="left">
                        <input type="checkbox">
                        <i id="star" class="bi bi-star ${
                          mail.starred && "star-active"
                        }"></i>
                        <span>${mail.sender}</span>
                    </div>
                    <div class="right">
                        <p class="message-title">${trimString(
                          mail.title,
                          30
                        )}</p>
                        <p class="message-desc">${trimString(
                          mail.message,
                          40
                        )}</p>
                        <p class="message-date">${mail.date}</p>


                        <button id="delete">Delete</button>
                    </div>
                </div>
    `
    )
    .join("");
}

export function showModal(modal, willOpen) {
  modal.style.display = willOpen ? "grid" : "none";
}

//categories render
export function renderCategories(outlet, data, selectedCategory) {
    outlet.innerHTML = '';

  data.forEach((category) => {
    const categoryItem = document.createElement("a");

    categoryItem.dataset.name = category.title;

    categoryItem.className = selectedCategory === category.title && "active-category";


    categoryItem.innerHTML = `
    <i class="bi ${category.class}"></i>
    <span>${category.title}</span>
    `;

    outlet.appendChild(categoryItem);
  });
}
