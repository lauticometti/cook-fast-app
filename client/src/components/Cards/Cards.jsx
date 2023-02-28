import { Card } from "../"
import styles from './Cards.module.css'

export function Cards({recipes}) {
  return (
    <div className= {styles.container}>
      {
        recipes === 'Loading' ? <p>Loading</p> : recipes?.map(recipe => {
          return <Card 
            healthScore={recipe.healthScore}
            image={recipe.image}
            name={recipe.name}
            diets={recipe.diets}
            key={recipe.id}
            id={recipe.id}
          />
        })
      }
    </div>
  )
}