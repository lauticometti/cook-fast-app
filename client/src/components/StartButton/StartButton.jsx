import styles from './StartButton.module.css'

export function StartButton({ type, fn }) {
  return (
    <button className={styles.button}>
      Start cooking
    </button>
  );
}
