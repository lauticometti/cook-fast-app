import StartButton from '../StartButton/StartButton'
import Nav from '../Nav/Nav'
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing(props) {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <Nav />
        <main className={styles.main}>
          <span className={styles.spanCookToday}> What do you wanna cook today?</span>
          <h1 className={styles.h1}>
            <span className={styles.cook}>Cook</span>
            <span className={styles.fast}>Fast</span>
          </h1>
          <h2 className={styles.h2}>
            <span className={styles.h2Cook}>Cook</span>
            <span className={styles.h2AtHome}>at home</span>
          </h2>
          <p className={styles.mainP}>Search in our recipes wiki and know fastly how to cook your next favorite food</p>
        </main>
        <div className={styles.startCookingBtn}>
          <Link to='/home'>
            <StartButton />
          </Link>
        </div>
      </div>
    </div>
  )
}