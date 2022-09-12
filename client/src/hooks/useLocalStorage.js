import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  // If using next.js then you would be using the SSR server side rendering
  // which does not have a window object to sort the isuue out you would do the following
  if (typeof window === "undefined") return initValue;

  // if the value is already stored in localStorage (value --> what you type into the form)
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // if its a function then return the result
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
