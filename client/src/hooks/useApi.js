import { useState, useEffect } from 'react';

export const useApi = (apiCall, initialData = null, dependencies = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiCall();
        if (mounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || 'Something went wrong');
          setData(initialData);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData };
};