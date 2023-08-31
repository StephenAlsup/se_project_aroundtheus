export function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keyup", handleEscUp);
  }
  
  export function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keyup", handleEscUp);
  }
  
  export function handleEscape({ key }) {
    if (key === "Escape") {
      const openModal = document.querySelector(".modal_opened");
      closeModal(openModal);
      console.log("clicked");
    }
  }