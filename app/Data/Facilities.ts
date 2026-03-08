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
    desc: "Provides book lending services, study seats, discussion rooms, and individual research rooms. Students may enter and borrow materials by scanning their student ID.",
    hours:
      "Term: Mon-Fri 08:10-21:30, Sat-Sun 09:00-17:00\nVacation: Mon-Fri 09:00-17:00, Closed on Weekends",
    location: "Central Campus",
  },
  {
    id: "gymnasium",
    name: "Indoor Gymnasium",
    desc: "Offers indoor sports courts and loanable equipment, including badminton, basketball, table tennis, and squash. Entry is free for students with a valid student ID.",
    hours: "Weekdays: 08:00 - 21:00\nWeekends & Holidays: 09:00 - 21:00",
    location: "Sports Complex",
  },
  {
    id: "fitness",
    name: "Fitness Center",
    desc: "An indoor fitness room located inside the gymnasium, equipped with training machines and treadmills. Students may enter by paying a NT$30 usage fee.",
    hours: "Weekdays: 08:00 - 21:00\nWeekends & Holidays: 09:00 - 21:00",
    location: "Indoor Gymnasium",
  },
  {
    id: "pool",
    name: "Swimming Pool",
    desc: "Includes indoor and outdoor pools that open alternately. Personal swimming equipment is required. Pool access is limited to the period from April 15 to October 15.",
    hours:
      "Weekdays: 18:00 - 21:00\nWeekends & Holidays: 14:00 - 17:00, 18:00 - 21:00",
    location: "Sports Complex",
  },
  {
    id: "lake",
    name: "Tranquility Lake",
    desc: "A campus landmark with a walking path surrounding the lake. Fishing and swimming are prohibited in this area.",
    hours: "Open 24 Hours",
    location: "Main Entrance Area",
  },
  {
    id: "activity_center",
    name: "Student Activity Center",
    desc: "The main area for student clubs and campus facilities, including dining options, a bookstore, convenience stores, and the campus post office.",
    hours: "Building: 24 Hours\nShops: Approx. 08:00 - 21:00",
    location: "Near Dormitories",
  },
  {
    id: "liwen",
    name: "Liwen Bookstore",
    desc: "Sells books, textbooks, and stationery, and offers book ordering services. IELTS registration and Apple campus experience services are also available.",
    hours:
      "Mon–Thu: 09:00 – 19:00, Fri: 09:00 – 18:00\nSat & National Holidays: 10:00 – 17:00 (Closed on Sunday)",
    location: "In the Activity Center",
  },
  {
    id: "copy_shop",
    name: "Copy Shop",
    desc: "Provides photocopying, printing, and binding services. Some course materials and printed handouts may also be obtained here.",
    hours: "Mon-Fri: 09:00 - 16:00\n(Hours may vary during vacation)",
    location: "Located between the Activity Center and the Graduate Dorms.",
  },
  {
    id: "post_office",
    name: "Post Office",
    desc: "Offers postal and banking services such as mail delivery, savings, and ticket purchases. Services are not available on weekends.",
    hours:
      "Mon-Fri: 08:30 - 17:00 (Break: 12:30 – 13:30)\n(Sat, Sun & National Holidays: Closed)",
    location: "Located between the Activity Center and the Graduate Dorms.",
  },
  {
    id: "cafeteria",
    name: "Student Cafeteria",
    desc: "Campus dining areas are mainly located in the Activity Center and General Classroom Building. Dining in the classroom building is only available at lunchtime.",
    hours: "Daily: 10:30 - 19:30\n(Breakfast starts ~07:00)",
    location: "Activity Center",
  },
  {
    id: "auditorium",
    name: "Auditorium",
    desc: "The largest assembly venue on campus, primarily used for official events. It is not open for general daily use.",
    hours: "Event Dependent",
    location: "Central Campus",
  },
  {
    id: "zhiyuan",
    name: "Zhiyuan Building",
    desc: "Provides short-term accommodation for visiting guests, with multiple room types available.",
    hours: "24 Hours (Front Desk)",
    location: "Near Activity Center",
  },
  {
    id: "trail",
    name: "Campus Hiking Trail",
    desc: "A hiking area within the campus. The area has limited lighting and occasional wildlife activity. Visiting at night is not recommended.",
    hours: "Open 24 Hours\n(Daytime recommended)",
    location: "East Campus / Back Mountain",
  },
  {
    id: "coop",
    name: "Campus Co-op Store",
    desc: "Supermarket selling daily necessities, snacks, drinks, and household itemsat student-friendly prices. Cash is commonly used, and LINE Pay is also accepted.",
    hours: "Mon-Fri: 08:00 - 20:00\nSun: 12:00 - 20:00\n(Closed on Saturdays)",
    location: "Basement of Activity Center",
  },
];
