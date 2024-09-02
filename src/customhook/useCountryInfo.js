import { useEffect, useState } from "react";

function useCountryInfo() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flag,capital,cca2`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, []);
  
  return { list, loading, error };
}

export default useCountryInfo;