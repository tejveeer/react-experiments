import axios from 'axios';
import { useEffect, useState } from 'react';

export async function getImportablePaths() {
  const { data } = await axios.get(
    'http://localhost:2500/categories/importable-paths',
  );

  return data.map((path) => path.split('../categories/')[1]);
}

export function useImportablePaths() {
  const [state, setState] = useState('');
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        'http://localhost:2500/categories/importable-paths',
      );
      setState(data);
    }
    getData();
  }, []);
  return state;
}

export async function getCategories() {
  const { data } = await axios.get('http://localhost:2500/categories/');
  return data;
}

export function useCategories() {
  const [state, setState] = useState('');
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('http://localhost:2500/categories/');
      setState(data);
    }
    getData();
  }, []);
  return state;
}

export async function getCategoriesInformation() {
  const { data } = await axios.get(
    'http://localhost:2500/categories/information',
  );
  return data;
}

export function useCategoriesInformation() {
  const [state, setState] = useState('');
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        'http://localhost:2500/categories/information',
      );
      setState(data);
    }
    getData();
  }, []);
  return state;
}
