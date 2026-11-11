import { useState, useEffect } from 'react';
import { getBusinesses, getMapPins } from '../api/businesses';

export function useBusinesses(params = {}) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getBusinesses(params)
      .then(setBusinesses)
      .catch(setError)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { businesses, loading, error };
}

export function useMapPins() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMapPins()
      .then(setPins)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { pins, loading, error };
}
