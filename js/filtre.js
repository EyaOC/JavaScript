import { displayWorks } from "./works.js";

//Affichage des catégories
export function displayWorksAndCategories(stockCategories, work) {
  const portFolio = document.getElementById("portfolio");
  const buttonDiv = document.createElement("div");
  portFolio.appendChild(buttonDiv);
  const buttonADD = document.createElement("button");
  buttonADD.textContent = "Tous ";
  buttonADD.addEventListener("click", () => {
    displayWorks(work);
  });
  buttonADD.classList.add("button_category");
  buttonDiv.classList.add("button_div");
  buttonDiv.appendChild(buttonADD);
  stockCategories.forEach((category) => {
    const buttonCategory = document.createElement("button");
    buttonCategory.textContent = category.name;
    buttonCategory.classList.add("button_category");
    buttonDiv.appendChild(buttonCategory);
    buttonCategory.addEventListener("click", () => {
      const categoryName = buttonCategory.textContent;
      const gallery = document.querySelector(".gallery");
      const filterWorks = work.filter((work) => {
        return work.category.name === categoryName;
      });
      gallery.innerHTML = "";
      filterWorks.forEach((project) => {
        const figure = document.createElement("figure");
        figure.innerHTML = `
                      <img src="${project.imageUrl}" alt= "${project.title}">
                      <figcaption>${project.title}</figcaption>
                      `;
        gallery.appendChild(figure);
      });
      console.log(filterWorks);
    });
    displayWorks(work);
  });
  const secondChild = portFolio.children[1];
  portFolio.insertBefore(buttonDiv, secondChild);
}
