import { useState } from "react";
import { useDispatch } from "react-redux";
import icon from "../../assets/magnifying-glass.svg";
import { getRecipesByName } from "../../redux/actions";
import styles from "./Searchbar.module.css";

export function Searchbar(props) {

  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setSearchInput(event.target.value)
  }  

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getRecipesByName(searchInput))
    props.setCurrentPage(1) 
    //If you are at any page different of page 1, and you make a search that return 
    //an amount of recipes that change the number of pages for one smaller than you are, 
    //so you cant see any recipe. The line 20 fix it.
  }

  const handleKeyDown = (event) => {
      if((event.charCode || event.keyCode) === 13) handleSubmit(event)
  }


  return (
    <div className={styles.container}>
      <input type="text" placeholder='Search...' className={styles.input} value={searchInput} onChange={handleInputChange} onKeyDown={handleKeyDown}/> 
      <button className={styles.button} onClick={handleSubmit}>
        <img src={icon} alt="magnifying glass icon" className={styles.buttonImage}/>
      </button>
    </div>
  )
}