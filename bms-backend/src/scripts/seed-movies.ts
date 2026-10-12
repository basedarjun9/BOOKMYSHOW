// File: src/modules/movie/movie.seed.ts

import mongoose from "mongoose";
import { MovieModel } from "../modules/movie/movie.model";
import { config } from "../config/config";

const movies = [
  {
    title: "Dorothy",
    genre: ["Action", "Adventure", "Crime", "Drama"],
    rating: 9.1,
    votes: 95000,
    languages: ["Tamil"],
    certification: "UA+",
    duration: "2h 26m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791574678/m1.png",
    releaseDate: new Date("2026-09-24"),
    description:
      "Early 1990s rural Tamil Nadu near Madurai, a harsh environment dominated by caste hierarchies, patriarchy, and toxic masculinity.",
  },
  {
    title: "DC",
    genre: ["Superhero", "Action", "Sci-Fi", "Fantasy"],
    rating: 8.6,
    votes: 85000,
    languages: ["Tamil","Telugu","Malayalam"],
    certification: "UA+",
    duration: "2h 23m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791609196/DC.png",
    releaseDate: new Date("2025-08-01"),
    description: "Rebel Devadas becomes a fugitive on the run after avenging his mother's murder and getting caught up in a deadly heist and police corruption..",
  },
  {
    title: "Kadaisi Vivasayi",
    genre: ["Drama", "Comedy"],
    rating: 8.9,
    votes: 90000,
    languages: [ "Tamil" , "Telugu",],
    certification: "UA13+",
    duration: "2h 23m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791609453/m3.png",
    releaseDate: new Date("2021-02-11"),
    description:
      "Mayandi, a farmer, is asked by the villagers to grow paddy for an annual temple festival. However, he gets arrested under false charges while his crop gets ruined due to neglect.",
  },
  {
    title: "Modha Rathri",
    genre: ["Drama", "Comedy","Mystery"],
    rating: 8.0,
    votes: 75000,
    languages: [ "Tamil", "Telugu"],
    certification: "UA16+",
    duration: "2h 30m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791609714/moodha_rathiri.png",
    releaseDate: new Date("2026-08-21"),
    description:
      "Brought together at an unusual wedding, two strangers navigate a wild night packed with sudden surprises and tangled lies, spiraling into total chaos that changes their lives forever.",
      format: ["2D", "3D", "IMAX 3D"]
  },
  {
    title: "Baththa",
    genre: ["Drama", "Comedy","Mystery"],
    rating: 8.0,
    votes: 72000,
    languages: ["Tamil", "Telugu"],
    certification: "UA16+",
    duration: "2h 40m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791609968/baththa.png",
    releaseDate: new Date("2026-10-01"),
    description:
      " The film opened to widespread critical acclaim. Reviewers heavily praised Vijay Sethupathi's performance, the assured '80s-period writing, and the seamless tonal shifts between comedy and deeply emotional drama..",
  },
  {
    title: "Nooru Saami",
    genre: ["Drama", "Family","Social"],
    rating: 7.5,
    votes: 60000,
    languages: ["Tamil", "Telugu"],
    certification: "UA16+",
    duration: "2h 30m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791610588/nooru_saami.png",
    releaseDate: "2026-06-19",
    description:
      "The film follows Selvi, a hardworking and resilient young widow living in a conservative rural village in Tamil Nadu..",
  },
  {
    title: "How to Train Your Dragon: Return of Night Fury",
    genre: ["Animation", "Fantasy", "Adventure"],
    rating: 8.8,
    votes: 32500,
    languages: ["English", "Hindi"],
    certification: "UA",
    duration: "1h 45m",
    posterUrl:
      "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751826680/lkpu6rs2rxu4jckxtony.avif",
    releaseDate: "2025-09-10",
    description:
      "Hiccup and Toothless return for a magical journey as a new Night Fury rises.",
      format: ["2D", "3D"]
  },

  {
    title: "Jurassic Park: Rebirth",
    genre: ["Sci-Fi", "Adventure", "Action"],
    rating: 9.0,
    votes: 60500,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "UA16+",
    duration: "2h 35m",
    posterUrl:
      "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751790815/kw1gearclw4vjmnkxw0o.avif",
    releaseDate: "2025-09-01",
    description:
      "Dinosaurs return in a world no longer in control — the race for survival begins anew.",
    format: ["2D", "3D", "IMAX 3D"]
  },
  {
    title: "Sitaare Zameen Par",
    genre: ["Drama", "Family"],
    rating: 7.5,
    votes: 65000,
    languages: ["Tamil","Hindi","Telugu"],
    certification: "UA16+",
    duration: "2h 20m",
    posterUrl:
      "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751790462/huw3x0efjerh3zxoqtaq.avif",
    releaseDate: "2025-07-12",
    description:
      "A heartwarming story of a teacher who helps a dyslexic child discover the star within.",
  },
  {
    title: "Meesaya Murukku 2",
    genre: ["Music", "Romance", "Action"],
    rating: 6.5,
    votes: 50000,
    languages: ["Tamil"," Telugu", "Hindi"],
    certification: "UA13+",
    duration: "2h 30m",
    posterUrl:
      "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791611209/meesaya_murukku2.png",
    releaseDate: "2026-09-25",
    description:
      "It is a spiritual successor and semi-biographical continuation of Meesaya Murukku (2017). The narrative follows three generations trying to take their street-rooted music and Gaana culture to the mainstream while battling systemic, class, and societal barriers..",
  },
];

const seedMovies = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("Connected to DB");

    await MovieModel.deleteMany();
    await MovieModel.insertMany(movies);

    console.log("Movies seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding movies:", err);
    process.exit(1);
  }
};

seedMovies();
