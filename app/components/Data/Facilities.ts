export interface Facilities {
  id: string;
  name: string;
  desc: string;
  hours: string;
  location: string;
}

export const FACILITIES: Facilities[] = [
  {
    id: "lib",
    name: "Library",
    desc: "Main library offering vast collections, quiet study areas, and multimedia rooms.",
    hours: "Term: Mon-Fri 08:10-21:30, Sat-Sun 09:00-17:00\nVacation: Mon-Fri 09:00-17:00, Closed on Weekends",
    location: "Central Campus",
  },
  {
    id: "gym",
    name: "Indoor Gymnasium",
    desc: "Multi-purpose sports complex with badminton courts, fitness center, and swimming pool (Apr-Oct).",
    hours: "Daily: 08:00 - 21:00\n(Pool open seasonally)",
    location: "Sports Complex",
  },
  {
    id: "lake",
    name: "Tranquility Lake",
    desc: "A famous scenic spot at CCU, featuring the iconic black swans and a zigzag bridge.",
    hours: "Open 24 Hours",
    location: "Main Entrance Area",
  },
  {
    id: "activity_center",
    name: "Student Activity Center",
    desc: "The hub for student clubs, containing the cafeteria, convenience stores, and post office.",
    hours: "Building: 24 Hours\nShops: Approx. 08:00 - 21:00",
    location: "Near Dormitories",
  },
   {
    id: "liwen",
    name: "Liwen Bookstore",
    desc: "Located inside the Activity Center.",
    hours: "Mon–Thu: 09:00 – 19:00, Fri: 09:00 – 18:00\nSat & National Holidays: 10:00 – 17:00 (Closed on Sunday)",
    location: "In the Activity Center",
  },
  {
    id: "copy_shop",
    name: "Copy Shop",
    desc: "Located between the Activity Center and the Graduate Dorms.",
    hours: "Mon-Fri: 09:00 - 16:00\n(Hours may vary during vacation)",
    location: "Located between the Activity Center and the Graduate Dorms.",
  },
    {
    id: "post_office",
    name: "Post Office",
    desc: "Located between the Activity Center and the Graduate Dorms.",
    hours: "Mon-Fri: 08:30 - 17:00 (Break: 12:30 – 13:30)\n(Sat, Sun & National Holidays: Closed)",
    location: "Located between the Activity Center and the Graduate Dorms.",
  },
  {
    id: "cafeteria",
    name: "Student Cafeteria",
    desc: "Offers a variety of affordable food stalls, buffet, and breakfast options.",
    hours: "Daily: 10:30 - 19:30\n(Breakfast starts ~07:00)",
    location: "Activity Center",
  },
  {
    id: "dorm_undergrad",
    name: "Undergraduate Dorms",
    desc: "On-campus housing for undergraduate students with secure card access.",
    hours: "Open 24 Hours\n(Access restricted to residents)",
    location: "Dormitory Area",
  },
  {
    id: "dorm_grad",
    name: "Graduate Dorms",
    desc: "Housing for graduate students. Note: Nighttime curfew enforcement for entry.",
    hours: "Open 24 Hours\n(Door Control: 23:00 - 06:00)",
    location: "Dormitory Area",
  },
  {
    id: "auditorium",
    name: "Auditorium",
    desc: "Venue for large-scale university events, ceremonies, and artistic performances.",
    hours: "Event Dependent",
    location: "Central Campus",
  },
  {
    id: "zhiyuan",
    name: "Zhiyuan Building",
    desc: "University guest house and hotel facility for visitors and visiting scholars.",
    hours: "24 Hours (Front Desk)",
    location: "Near Activity Center",
  },
  {
    id: "trail",
    name: "Campus Hiking Trail",
    desc: "A nature trail in the 'Back Mountain' area, popular for jogging and walking.",
    hours: "Open 24 Hours\n(Daytime recommended)",
    location: "East Campus / Back Mountain",
  },
  {
    id: "coop",
    name: "Campus Co-op Store",
    desc: "Supermarket selling daily necessities, snacks, and drinks at student-friendly prices.",
    hours: "Mon-Fri: 08:00 - 20:00\nSun: 12:00 - 20:00\n(Closed on Saturdays)",
    location: "Basement of Activity Center",
  },
];