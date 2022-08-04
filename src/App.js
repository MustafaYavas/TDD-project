import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
    return (
        <div className={styles['main-container']}>
            <div className={styles['sub-container']}>
                <SearchBar />
            </div>
        </div>
    )
}

export default App;