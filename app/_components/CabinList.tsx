import { getCabins } from "../_lib/data-service";
import type { Cabin } from "../_types/cabin";
import CabinCard from "./CabinCard";
// import { unstable_noStore as noStore} from "next/cache";


type Props = {
  filter: string | string []
}
export default async function CabinList({filter} : Props) {
  // noStore()
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "small") displayedCabins = cabins.filter((cabin) => (cabin.maxCapacity ?? 0) <= 3);
  else if (filter === "medium") displayedCabins = cabins.filter((cabin) => (cabin.maxCapacity ?? 0) >= 4 && (cabin.maxCapacity ?? 0) <= 7);
  else if (filter === "large") displayedCabins = cabins.filter((cabin) => (cabin.maxCapacity ?? 0) >= 8);
  else displayedCabins = cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}