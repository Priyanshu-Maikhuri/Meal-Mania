import { useGlobalContext } from "../Context"

function Favorites() {
  const { favorites, addToFavorites, removeFavorite, selectMeal } = useGlobalContext()
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h4>Favorites</h4>
        <div className="favorites-container">
          {favorites.map((item) => {
            const { idMeal, strMeal: title, strMealThumb: image } = item
            return <div key={idMeal} className="favorite-item">
              <img src={image} alt={title} className="img favorite-img" onClick={() => selectMeal(idMeal, true)} />
              <button onClick={() => removeFavorite(idMeal)} className="remove-btn">remove</button>
            </div>
          })
          }
        </div>
      </div>
    </section>
  )
}

export default Favorites