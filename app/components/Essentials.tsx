"use client";
import Finance from "./EssentialsItem/Finance";
import Healthcare from "./EssentialsItem/Healthcare";
import Club from "./EssentialsItem/Club";
import EntertainmentFacilities from "./EssentialsItem/EntertainmentFacilities";
import AdmissionInstructions from "./EssentialsItem/AdmissionInstructions";

interface EssentialsViewProps {
  subTab: string;
}

export default function Essentials({ subTab }: EssentialsViewProps) {
  switch (subTab) {
    case "Finance":
      return <Finance />;
      
    case "Healthcare":
      return <Healthcare />;
      
    // 雖然選單上只有 Entertainment，但實際傳進來的是子選項
    case "Club":
      return <Club />;
      
    case "Entertainment Facilities":
      return <EntertainmentFacilities />;
      
    case "Admission Instructions":
      return <AdmissionInstructions />;

    default:
      return <Finance />;
  }
}