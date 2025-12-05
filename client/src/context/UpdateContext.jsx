import { createContext, useState, useCallback } from 'react';

// 1. Create the Context
export const UpdateContext = createContext();

// 2. Create the Provider Component
export const UpdateProvider = ({ children }) => {
    // State to track updates. We just need a counter that changes.
    const [updateCounter, setUpdateCounter] = useState(0);

    // Function to call whenever a change happens (e.g., journal submitted)
    // useCallback ensures this function reference remains stable.
    const triggerUpdate = useCallback(() => {
        setUpdateCounter(prevCount => prevCount + 1);
    }, []);

    return (
        <UpdateContext.Provider value={{ updateCounter, triggerUpdate }}>
            {children}
        </UpdateContext.Provider>
    );
};