import "./Dropdown.css";
import downArrow from "../../assets/down-arrow.svg";
import { useState } from "react";
import { capitalize } from "../../helpers";

export function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [marked, setMarked] = useState([
    props.items.map(el => false)
  ])

  const handleCheckbox = (event) => {
    const diet = event.target.id
    const { setCurrentDiets, currentDiets } = props 

    const currentIndex = props.items.indexOf(diet) 
    const newMarked = [...marked]

    if (currentDiets.includes(diet)) {
      setCurrentDiets(currentDiets.filter(el => el !== diet))
      newMarked[currentIndex] = false
      setMarked(newMarked)
    }
    else {
      setCurrentDiets([...currentDiets, diet]) 
      newMarked[currentIndex] = true
      setMarked(newMarked)
    }
  }

  return (
    <div className="dropdown">
      <div className="dropdownContainer">
        <div onClick={toggling} className="dropdownHeader">
          <p className="headerP">{props.title}</p>
          <img
            src={downArrow}
            alt=""
            className={`headerIcon ${isOpen ? "" : "rotate"}`}
          />
        </div>

        <div className={`dropdownListContainer ${isOpen ? "displayed" : ""}`}>
          <ul className="dropdownList">
            {props.items.map((el, i) => (
              <li
                key={el + Math.floor(Math.random() * 1000)}
                className="dropdownListItem"
              >
                <label htmlFor={el} className="label">
                  <p>{capitalize(el)}</p>
                  <input
                    type={props.type || "radio"}
                    name={props.title}
                    id={el}
                    className={`${props.type || "radio"}Input ${marked[i] ? 'active' : ''}`}
                    onClick={props.type === 'checkbox' ? handleCheckbox : null}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
