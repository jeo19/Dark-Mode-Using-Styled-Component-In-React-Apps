import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './components/useDarkMode';
import { GlobalStyles } from './components/GlobalStyles';
import { lightTheme, darkTheme } from './components/Theme';
import Toggler from './components/Toggler';
import './App.css';
import dummyData from './data';
import CardList from './components/CardList';
import Toggle from './components/Toggler';

const App = () => {
    const [videos, setVideos] = useState([]);
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    useEffect(() => {
        const timer = setTimeout(() => {
            setVideos(dummyData);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    if (!mountedComponent) return <div />;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <>
                <div className="App">
                    <Toggle theme={theme} toggleTheme={themeToggler}></Toggle>
                    {videos.map((list, index) => {
                        return (
                            <section key={index}>
                                <h2 className="section-title">
                                    {list.section}
                                </h2>
                                <CardList list={list} />
                                <hr />
                            </section>
                        );
                    })}
                </div>
            </>
        </ThemeProvider>
    );
};

export default App;
