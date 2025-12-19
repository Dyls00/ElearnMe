import { faker } from '@faker-js/faker';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const userSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    firstname: String,
    email: String,
    roles: Array,
    date_creation: Date,
});

const User = mongoose.model("users", userSchema);

const users = Array.from({ length: 29000 }, (_, index) => {
    const dateComplete = faker.date.past();
    const date = dateComplete.toISOString().split('T')[0];

    return {
        _id: index + 1,
        name: faker.person.lastName(),
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        Roles: faker.helpers.arrayElements(["formateur", "etudiant","admin"], { min: 1, max: 2 }),
        date_creation: date,
    };
});


main();

async function main() {
    try {
        await mongoose.connect(process.env.DB);

        for (const data of users) {
            const user = new User({
                _id: data._id,
                name: data.name,
                firstname: data.firstname,
                email: data.email,
                roles: data.Roles,
                date_creation: data.date_creation
            });
            //console.log(user);
            await user.save();
        }
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await mongoose.connection.close();
        console.log("Fetch users réussi ! déconnecté");
    }
}
