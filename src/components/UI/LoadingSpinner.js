import styles from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
    return (
        <>
            <div className={styles.spinner}>
                <div className={styles.dot1}></div>
                <div className={styles.dot2}></div>
            </div>
        </>
    )
}

export default LoadingSpinner;