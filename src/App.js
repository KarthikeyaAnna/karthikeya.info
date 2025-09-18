import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollAnimation from './components/ScrollAnimation';
import About from './components/About';

const App = () => {
    return (
        <div className="App">
            <CustomCursor />
            <div className="crt-overlay"></div>
            <Header />
            <main>
                <Home />
                <ScrollAnimation>
                    <About />
                </ScrollAnimation>
                <ScrollAnimation>
                    <Projects />
                </ScrollAnimation>
                <ScrollAnimation>
                    <Contact />
                </ScrollAnimation>
            </main>
        </div>
    );
}

export default App;
