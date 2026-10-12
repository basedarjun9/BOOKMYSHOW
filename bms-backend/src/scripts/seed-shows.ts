// seed/showSeeder.ts

import mongoose from "mongoose";
import dayjs from "dayjs";

import { MovieModel } from "../modules/movie/movie.model";
import { TheaterModel } from "../modules/theater/theater.model";
import { ShowModel } from "../modules/show/show.model";
import { config } from "../config/config";
import { generateSeatLayout } from "../utils";

// ======================================================
// PRICE MAP
// ======================================================

const generatePriceMap = () =>
  new Map([
    ["PREMIUM", 350],
    ["EXECUTIVE", 200],
    ["NORMAL", 150],
  ]);

// ======================================================
// SHOW FORMATS
// ======================================================

const formats = [
  "2D",
  "3D",
  "IMAX",
  "PVR PXL",
];

// ======================================================
// SHOW TIME SLOTS
// ======================================================

const fixedTimeSlots = [
  {
    start: "09:00 AM",
    end: "11:30 AM",
  },
  {
    start: "12:30 PM",
    end: "03:00 PM",
  },
  {
    start: "04:00 PM",
    end: "06:30 PM",
  },
  {
    start: "07:30 PM",
    end: "10:00 PM",
  },
  {
    start: "10:30 PM",
    end: "01:00 AM",
  },
];

// ======================================================
// MAIN SEED FUNCTION
// ======================================================

export const seedShow = async () => {

  // ====================================================
  // SELECT ALL MOVIES
  // ====================================================

  const movies = await MovieModel.find({});

  // ====================================================
  // SELECT TAMIL NADU THEATRES
  // ====================================================

  const theatres = await TheaterModel.find({
    state: "Tamil Nadu",
  });

  // ====================================================
  // CHECK MOVIES
  // ====================================================

  if (!movies.length) {
    console.error(
      "❌ No movies found in the database."
    );

    return;
  }

  // ====================================================
  // CHECK THEATRES
  // ====================================================

  if (!theatres.length) {
    console.error(
      "❌ No theatres found for Tamil Nadu."
    );

    return;
  }

  console.log(
    `🎬 Movies found: ${movies.length}`
  );

  console.log(
    `🏢 Tamil Nadu theatres found: ${theatres.length}`
  );

  // ====================================================
  // CURRENT DATE
  // ====================================================

  const today = dayjs().startOf("day");

  console.log(
    `📅 Today: ${today.format("DD-MM-YYYY")}`
  );

  // ====================================================
  // CREATE SHOWS
  // TODAY + TOMORROW
  // ====================================================

  for (const movie of movies) {

    console.log(
      `\n🎬 Processing movie: ${movie.title}`
    );

    for (const theatre of theatres) {

      console.log(
        `🏢 Processing theatre: ${theatre.name}`
      );

      // ------------------------------------------------
      // d = 0 → Today
      // d = 1 → Tomorrow
      // ------------------------------------------------

      for (let d = 0; d < 2; d++) {

        const showDate = today.add(d, "day");

        const formattedDate =
          showDate.format("DD-MM-YYYY");

        console.log(
          `📅 Processing date: ${formattedDate}`
        );

        // ==================================================
        // CHECK EXISTING SHOWS
        // ==================================================

        const existingShows =
          await ShowModel.find({
            movie: movie._id,
            theater: theatre._id,
            date: formattedDate,
          });

        // ==================================================
        // DON'T CREATE DUPLICATES
        // ==================================================

        if (existingShows.length > 0) {

          console.log(
            `⏭️ Shows already exist for ${movie.title} | ${theatre.name} | ${formattedDate}`
          );

          continue;
        }

        // ==================================================
        // RANDOMLY CREATE 2–4 SHOWS
        // ==================================================

        const numShows =
          Math.floor(Math.random() * 3) + 2;

        const selectedSlots =
          fixedTimeSlots.slice(0, numShows);

        // ==================================================
        // CREATE SHOWS
        // ==================================================

        for (const slot of selectedSlots) {

          const randomFormat =
            formats[
              Math.floor(
                Math.random() * formats.length
              )
            ];

         const priceMap = generatePriceMap();

const seatLayout = generateSeatLayout().map((row) => ({
  ...row,
  price: priceMap.get(row.type) ?? 0,
}));

const newShow = new ShowModel({
  movie: movie._id,
  theater: theatre._id,
  location: theatre.state,
  format: randomFormat,
  audioType: "Dolby 7.1",
  startTime: slot.start,
  date: formattedDate,
  priceMap,
  seatLayout,
});

          await newShow.save();

          console.log(
            `   ✅ ${formattedDate} | ${slot.start} | ${randomFormat}`
          );
        }
      }
    }
  }

  console.log(
    "\n========================================"
  );

  console.log(
    "🎉 SHOW SEEDING COMPLETED SUCCESSFULLY"
  );

  console.log(
    "========================================"
  );
};

// ======================================================
// DATABASE CONNECTION
// ======================================================

mongoose
  .connect(config.databaseUrl as string)

  .then(async () => {

    console.log(
      "✅ Database connected"
    );

    await seedShow();

    await mongoose.disconnect();

    console.log(
      "🔌 Database connection closed"
    );
  })

  .catch((error) => {

    console.error(
      "❌ Database connection error:",
      error
    );

    process.exit(1);
  });