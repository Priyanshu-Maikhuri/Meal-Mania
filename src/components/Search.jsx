import { useState } from 'react'
import { useGlobalContext } from '../Context'

function Search() {
  const [text, setText] = useState('')
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()

  function handleTextChange(event) {
    setText(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim().length) {
      setSearchTerm(text.trim())
    }
  }

  function handleRandomMeal() {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input className='form-input'
          type="text"
          value={text}
          placeholder='type favorite meal'
          onChange={handleTextChange} />
        <button className="btn" type='submit'>Search</button>
        <button className="btn btn-hipster"
          type='button'
          onClick={handleRandomMeal}>Surprise Me!
        </button>
      </form>
    </header>
  )
}

export default Search