import styles from './App.module.css';
import Weather from './components/Weather/Weather';

const App = () => {
    return (
        <div className={`${styles['main-container']} text-white`} >
            <div className={styles['sub-container']}>
                <Weather />
            </div>
        </div>
    )
}

export default App;