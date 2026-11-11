import { useState, useEffect } from 'react';
import { getStandards } from '../api/standards';

export function useStandards() {
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStandards()
      .then(setStandards)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { standards, loading, error };
}
