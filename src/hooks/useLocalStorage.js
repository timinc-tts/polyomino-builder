import { useEffect, useState } from "react";

export default function useLocalStorage(initialValue, key) {
  const [val, setVal] = useState(JSON.parse(localStorage.getItem(key)) || initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [key, val]);

  return [val, setVal]
}