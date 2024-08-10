import axios from "axios";
import { useEffect, useState } from "react";

export default function Experiment() {
  const { isLoading } = useCategoriesInformation();
  if (isLoading) {
    return (
      <div className="mx-auto w-min rounded-md bg-yellow-300 px-2 text-yellow-600">
        Loading
      </div>
    );
  }

  return <>Got the data!</>;
}

function useCategoriesInformation() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:2500/categories/information")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
  }, []);

  return { isLoading, data };
}
