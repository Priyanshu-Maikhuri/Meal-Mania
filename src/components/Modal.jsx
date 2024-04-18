import { useGlobalContext } from "../Context"
import { AiOutlineYoutube } from "react-icons/ai";

function Modal() {
  const { selectedMeal, closeModal } = useGlobalContext()
  const { strMeal: title,
    strInstructions: instructions,
    strMealThumb: image,
    strSource: source,
    strYoutube: youtube } = selectedMeal
  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} alt={title} className="img modal-img" />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p>{instructions}</p>
          <a href={source}>Original Source</a>
          <a href={youtube}><AiOutlineYoutube /></a>
          <button className="btn btn-hipster modal-close-btn" onClick={closeModal}>close</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal