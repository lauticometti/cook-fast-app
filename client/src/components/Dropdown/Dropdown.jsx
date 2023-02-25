import "./Dropdown.css"
import downArrow from "../../assets/down-arrow.svg"
import { useState } from "react";


export default function Dropdown(props) {

  const [isOpen, setIsOpen] = useState(false)
  const toggling = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <div className="dropdownContainer">
        <div onClick={toggling} className="dropdownHeader">
          <p className="headerP">{props.title}</p>
          <img src={downArrow} alt="" className={`headerIcon ${isOpen ? '' : 'rotate'}`}/>
        </div>
        
        <div className={`dropdownListContainer ${isOpen ? 'displayed' : ''}`}>
          <ul className="dropdownList">
            {
              props.items.map(el => (
                <li key={el + Math.floor(Math.random() * 1000)} className="dropdownListItem">
                  <label htmlFor={el} className="label">
                    <p>{el}</p>
                    <input type={props.type || 'radio'} name={props.title} id={el} className={`${props.type || 'radio'}Input`} />
                  </label>
                </li>
              ))
            }
          </ul>
        </div>
        
      </div>
    </div>
  );
}