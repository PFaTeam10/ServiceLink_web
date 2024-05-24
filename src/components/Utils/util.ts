import { useState, useEffect } from 'react';

interface DataFetchingResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export const useDataFetching = <T>(fetchDataFunction: () => Promise<T>): DataFetchingResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchDataFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (error:any) {
        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchDataFunction]);

  return { data, loading, error , setData };
};


export const useDataFetchingById = <T>(fetchDataFunction: (id:string) => Promise<T>,id:string): DataFetchingResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        if(id)
        {
          const result = await fetchDataFunction(id);
          if (isMounted) {
            setData(result);
          }
        }
      } catch (error:any) {
        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchDataFunction,id]);

  return { data, loading, error };
};


