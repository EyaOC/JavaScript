//Récupération des projets (CALL API)
export async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}
//Récupération des catégories (CALL API)
export async function fetchCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}
