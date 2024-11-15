import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        if (item) {
          // For Set type, we need special handling
          if (initialValue instanceof Set) {
            // Ensure we maintain the type of the original Set
            return new Set(JSON.parse(item)) as T;
          }
          return JSON.parse(item);
        }
      }
      return initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        // For Set type, we need to convert to array before storing
        const valueToStringify = valueToStore instanceof Set 
          ? Array.from(valueToStore)
          : valueToStore;
        
        window.localStorage.setItem(key, JSON.stringify(valueToStringify));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Subscribe to changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          // For Set type, we need special handling
          if (initialValue instanceof Set) {
            // Cast the new Set to the same type as T
            setStoredValue(new Set(newValue) as T);
          } else {
            setStoredValue(newValue as T);
          }
        } catch (error) {
          console.error('Error parsing storage change:', error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}
