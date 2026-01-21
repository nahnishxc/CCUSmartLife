"use client";
import About from "./CampusItem/About";
import Map from "./CampusItem/Map";
import Administrative from "./CampusItem/Administrative";
import Academic from "./CampusItem/Academic";
import Facilities from "./CampusItem/Facilities";

interface CampusViewProps {
  subTab: string;
}

export default function Campus({ subTab }: CampusViewProps) {
  switch (subTab) {
    case "About CCU":
      return <About />;
    case "Campus Map":
      return <Map />;
    case "Administrative":
      return <Administrative />;
    case "Academic":
      return <Academic />;
    case "Facilities":
      return <Facilities />;
    default:
      return <About />;
  }
}