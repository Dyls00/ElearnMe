import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const enrollmentSchema = new mongoose.Schema({
  _id: Number,
  user_id: Number,
  course_id: Number,
  progression: String,
  date_creation: Date,
});

const Enrollment = mongoose.model("enrollments", enrollmentSchema);

const enrollments = Array.from({ length: 15000 }, (_, index) => {
  const dateComplete = faker.date.past();
  const date = dateComplete.toISOString().split("T")[0];

  return {
    _id: index + 1, 
    user_id: Math.floor(Math.random() * 15000) + 1,
    course_id: Math.floor(Math.random() * 5000) + 1,
    progression: `${Math.floor(Math.random() * 100) + 1}%`,
    date_creation: date,
  };
});

main();

async function main() {
  try {
    await mongoose.connect(process.env.DB);

    for (const data of enrollments) {
            const enrollment = new Enrollment({
                _id: data._id,
                user_id: data.user_id,
                course_id: data.course_id,
                progression: data.progression,
                date_creation: data.date_creation
            });
            //console.log(enrollment);
            await enrollment.save();
        }

  } catch (error) {
    console.error("Erreur :", error);
  } finally {
    await mongoose.connection.close();
    console.log("Fetch enrollments réussi ! déconnecté");
  }
}
