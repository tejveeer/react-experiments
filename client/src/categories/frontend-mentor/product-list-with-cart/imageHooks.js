import { useEffect, useState } from "react";

export default function useImage(path) {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const restOfPath = path.replace("./assets/images/", "");
      try {
        const res = await import(`./assets/images/${restOfPath}`);
        setImage(res.default);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { loading, image };
}
