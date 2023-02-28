import styles from "./Paginate.module.css"

export function Paginate({recipesPerPage, lengthRecipes, paginate}) {
  const pageNumbers = []

  for (let  i = 0; i < Math.ceil(lengthRecipes/recipesPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {
          pageNumbers?.map(number => (
              <li key={number} onClick={()=> {
                paginate(number)
              }} className={styles.listItem}>
                {number}
              </li>
            )) 
        }
      </ul>
    </nav>
  )
}