import { faker } from '@faker-js/faker';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const categorie = ["Développement web", "mobile", "IA", "cybersécurité", "Algèbre", "géométrie", "calcul", "data science", "leadership", "soft skills"];
const courseSchema = new mongoose.Schema({
    _id: Number,
    titre: String,
    categorie: String,
    prix: Number,
    formateurs: Array,
    modules: Array,
    avis: Array,
    date_creation: Date,
});

const Course = mongoose.model("course", courseSchema);

const courses = Array.from({ length: 8000 }, (_, index) => {
    const dateComplete = faker.date.past();
    const date = dateComplete.toISOString().split('T')[0];

    return {
        _id: index + 1,
        titre: faker.science.chemicalElement().name,
        categorie: categorie[Math.floor(Math.random() * categorie.length)],
        prix: Math.floor(Math.random() * 999),
        formateurs: faker.helpers.multiple(() => faker.number.int({ min: 1, max: 10000 }), { count: 7 }),
        modules: [{
            titre: faker.science.chemicalElement().name,
            etapes: {
                titre: faker.lorem.lines(1),
                durée: Math.floor(Math.random() * 120)
            }
        },
    {
            titre: faker.science.chemicalElement().name,
            etapes: {
                titre: faker.lorem.lines(1),
                durée: Math.floor(Math.random() * 120)
            }
        }, {
            titre: faker.science.chemicalElement().name,
            etapes: {
                titre: faker.lorem.lines(1),
                durée: Math.floor(Math.random() * 120)
            }
        }, {
            titre: faker.science.chemicalElement().name,
            etapes: {
                titre: faker.lorem.lines(1),
                durée: Math.floor(Math.random() * 120)
            }
        }, {
            titre: faker.science.chemicalElement().name,
            etapes: {
                titre: faker.lorem.lines(1),
                durée: Math.floor(Math.random() * 120)
            }
        }],
        avis: [{
            _id: Math.floor(Math.random() * (15000) + 1),
            user_id: Math.floor(Math.random() * 5000),
            note: Math.floor(Math.random() * 5),
            commentaire: faker.lorem.lines(1)
        }, {
            _id: Math.floor(Math.random() * (15000) + 1),
            user_id: Math.floor(Math.random() * 5000),
            note: Math.floor(Math.random() * 5),
            commentaire: faker.lorem.lines(1)
        }, {
            _id: Math.floor(Math.random() * (15000) + 1),
            user_id: Math.floor(Math.random() * 5000),
            note: Math.floor(Math.random() * 5),
            commentaire: faker.lorem.lines(1)
        }, {
            _id: Math.floor(Math.random() * (15000) + 1),
            user_id: Math.floor(Math.random() * 5000),
            note: Math.floor(Math.random() * 5),
            commentaire: faker.lorem.lines(1)
        }, {
            _id: Math.floor(Math.random() * (15000) + 1),
            user_id: Math.floor(Math.random() * 5000),
            note: Math.floor(Math.random() * 5),
            commentaire: faker.lorem.lines(1)
        }, {
            _id: Math.floor(Math.random() * (15000) + 1),
            user_id: Math.floor(Math.random() * 5000),
            note: Math.floor(Math.random() * 5),
            commentaire: faker.lorem.lines(1)
        }],
        date_creation: date,
    };
});

main();

async function main() {
    try {
        await mongoose.connect(process.env.DB);

        for (const data of courses) {
            const course = new Course({
                _id: data._id,
                titre: data.titre,
                categorie: data.categorie,
                prix: data.prix,
                formateurs: data.formateurs,
                modules: data.modules,
                avis: data.avis,
                date_creation: data.date_creation,
            });
            //console.log(course);
            await course.save();
        }
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        await mongoose.connection.close();
        console.log("Fetch courses réussi ! déconnecté");
    }
}
