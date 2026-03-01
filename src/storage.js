export const state = {
  projects: [],
  selectedProjectId: null
}


export function saveToLocalStorage(state) {
  localStorage.setItem("appState", JSON.stringify(state));
}

export function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("appState"));
}

export function clearLocalStorage() {
  localStorage.clear();
}