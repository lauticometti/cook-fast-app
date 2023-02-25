import { useEffect } from "react"
import "./Modal.css"

export default function Modal(props)  {

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27 ) props.onClose()
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanUp() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])
  
  return (
      <div onClick={props.onClose} className={`modal ${props.show ? 'show' : ''}`}>
        <div onClick={e => e.stopPropagation()} className='modalContent'>
          
          <div className='modalBody'>
            {props.children}
          </div>
          <div className='modalFooter'>
            <button onClick={props.onClose} className='button'>
              {props.title}
            </button>
          </div>
        </div>
      </div>
  )
}

