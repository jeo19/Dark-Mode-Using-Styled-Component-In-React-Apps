import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './components/useDarkMode';
import { GlobalStyles } from './components/GlobalStyles';
import { lightTheme, darkTheme } from './components/Theme';
import './App.css';
import dummyData from './data';
import CardList from './components/CardList';
import Toggle from './components/Toggler';
import SkeletonCard from './components/SkeletonCard';

const App = () => {
    const [videos, setVideos] = useState([]);
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const [loading, setLoading] = useState(false);
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setVideos(dummyData);
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    console.log(loading);
    if (!mountedComponent) return <div />;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <>
                <div className="App">
                    {loading && <SkeletonCard />}
                    {!loading && (
                        <Toggle
                            theme={theme}
                            toggleTheme={themeToggler}
                        ></Toggle>
                    )}

                    {!loading &&
                        videos.map((list, index) => {
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
