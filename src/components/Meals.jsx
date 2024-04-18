import React from 'react'
import { useGlobalContext } from '../Context'
import { BsHandThumbsUp } from 'react-icons/bs'

function Meals() {
     const { meals, isLoading, selectMeal, addToFavorites } = useGlobalContext()

     return isLoading ?
          <section className='section'>
               <h4>Loading...</h4>
          </section> :
          meals.length < 1 ?
               <section className='section'>
                    <h4>No meals mathched your search term. Please try again.</h4>
               </section> :
               (
                    <section className='section-center'>
                         {meals.map((singleMeal) => {
                              const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
                              return <article key={idMeal} className='single-meal'>
                                   <img src={image} alt="meal image" className='img' onClick={() => selectMeal(idMeal)} />
                                   <footer>
                                        <h5>{title}</h5>
                                        <button className='like-btn' onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
                                   </footer>
                              </article>
                         })}
                    </section>
               )
}

export default Meals