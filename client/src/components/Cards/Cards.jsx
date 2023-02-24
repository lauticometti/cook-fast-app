import Card from "../Card/Card"
import styles from './Cards.module.css'

export default function Cards(props) {
  return (
    <div className= {styles.container}>
      {
        props.recipes.map(recipe => {
          return <Card 
            healthScore={recipe.healthScore}
            image={recipe.image}
            name={recipe.name}
            diets={recipe.diets}
            key={recipe.id}
          />
        })
      }
    </div>
  )
}