import axios from "axios";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useQGet(storageName, url) {
  const { isLoading, data } = useQuery({
    queryKey: [storageName],
    queryFn: () => axios.get(url).then((res) => res.data),
  });
  return { isLoading, data };
}

export function useQCache(storageName) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([storageName]);
}

export function useGet(url) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, data };
}

export function useImportablePaths() {
  const { data: importablePaths, isLoading } = useQGet(
    "importable-paths",
    "http://localhost:2500/categories/importable-paths",
  );
  return { importablePaths, isLoading };
}

export function useCategories() {
  return useQGet("categories", "http://localhost:2500/categories/");
}

export function useCategoriesInformation() {
  return useQGet(
    "categories-information",
    "http://localhost:2500/categories/information",
  );
}
