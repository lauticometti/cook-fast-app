import Card from "../Card/Card"
import styles from './Cards.module.css'

export default function Cards(props) {
  return (
    <div className= {styles.container}>
      {
        props.recipes.map(recipe => {
          return <Card 
            healthScore={100}
            image={recipe}
            name='Nombre de prueba que debe tener 100 caracteres como maximo'
            diets='Proteeeeina'
            key={recipe}
          />
        })
      }
    </div>
  )
}