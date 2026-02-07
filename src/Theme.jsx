import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // Menambah/menghapus class 'dark' pada elemen root HTML
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    const toggleTheme = () => setDark(!dark);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook agar mudah dipanggil di komponen lain
export const useTheme = () => useContext(ThemeContext);

// Komponen Toggle Button (untuk dipanggil di Navbar)
export const ThemeToggle = () => {
    const { dark, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="relative w-20 h-9 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center px-1 transition-all"
        >
            <div
                className={`w-7 h-7 rounded-full bg-black dark:bg-white transform transition-transform duration-300 ${dark ? 'translate-x-11' : 'translate-x-0'
                    }`}
            />
            <span className={`absolute ${dark ? 'left-3' : 'right-4'} text-xs font-medium`}>
                {dark ? 'Dark' : 'Light'}
            </span>
        </button>
    );
};