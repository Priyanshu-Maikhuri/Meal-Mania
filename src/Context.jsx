import { useContext, createContext, useEffect, useState } from "react";
import axios from 'axios'

const AppContext = createContext();
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

export const useGlobalContext = () => {
     return useContext(AppContext)
}

const AppProvider = ({ children }) => {
     const [meals, setMeals] = useState([])
     const [isLoading, setLoading] = useState(false)
     const [searchTerm, setSearchTerm] = useState('')
     const [showModal, setShowModal] = useState(false)
     const [selectedMeal, setSelectedMeal] = useState(null)
     const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

     useEffect(() => {
          fetchMeals(allMealUrl)
     }, [])

     useEffect(() => {
          if (!searchTerm) return
          fetchMeals(`${allMealUrl}${searchTerm}`);
     }, [searchTerm])

     const fetchMeals = async (url) => {
          setLoading(true)
          try {
               const { data } = await axios(url)
               if (data.meals) //considering no items for the result
                    setMeals(data.meals)
               else setMeals([])
          }
          catch (error) {
               console.log(error.response)
          }
          setLoading(false)
     }

     const fetchRandomMeal = () => {
          fetchMeals(randomMealUrl)
     }

     const selectMeal = (mealID, favoriteMeal) => {
          let meal;
          if (favoriteMeal)
               meal = favorites.find((meal) => meal.idMeal === mealID)
          else
               meal = meals.find((meal) => meal.idMeal === mealID)
          setSelectedMeal(meal)
          setShowModal(true)
     }

     const closeModal = () => {
          setShowModal(false)
     }

     const addToFavorites = (idMeal) => {
          const isFavarite = favorites.find((meal) => meal.idMeal === idMeal)
          if (isFavarite) return
          const meal = meals.find((meal) => meal.idMeal === idMeal)
          const updatedFavorites = [...favorites, meal]
          setFavorites(updatedFavorites)
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
     }

     const removeFavorite = (idMeal) => {
          const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
          setFavorites(updatedFavorites)
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
     }

     return (
          <AppContext.Provider value={{
               meals, isLoading, setSearchTerm, fetchRandomMeal, showModal,
               setShowModal, selectedMeal, selectMeal, closeModal, favorites,
               addToFavorites, removeFavorite
          }}>
               {children}
          </AppContext.Provider>
     )
}



export { AppContext, AppProvider }