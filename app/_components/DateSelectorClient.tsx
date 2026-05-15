"use client";

import DateSelector from "./DateSelector";
import type { Settings } from "../_types/setting";
import type { Cabin } from "../_types/cabin";

type Props = {
  settings: Settings;
  cabin: Cabin;
  bookedDates: string[];
};

export default function DateSelectorClient(props: Props) {
  return <DateSelector {...props} />;
}