import { useQCache } from "../../site/utils/categoriesUtils";

export default function Experiment() {
  const data = useQCache("importable-paths");
  console.log(data);
  return <></>;
}
