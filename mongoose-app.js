
const mongoose = require("mongoose");

main().catch(console.error);

async function main(){

    await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "A fruit which must not be named?"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });
    const Fruit = mongoose.model("Fruit", fruitSchema);
    const fruit = new Fruit({
        name: "Apple",
        rating: 7,
        review: "Nice"
    });

    const personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favouriteFruit: fruitSchema
    });
    const Person = mongoose.model("Person", personSchema);
    const person = new Person({
        name: "John",
        age: 28
    });

    const kiwi = new Fruit({
        name: "Kiwi",
        rating: 4,
        review: "Never tried before"
    });
    const orange = new Fruit({
        name: "Orange",
        rating: 7,
        review: "Good"
    });
    const banana = new Fruit({
        name: "Banana",
        rating: 7,
        review: "Good too"
    });
    const pineapple = new Fruit({
        name: "Pineapple",
        rating: 4,
        review: "Never tried before"
    });

    const amy = new Person({
        name: "Amy",
        age: 25,
        favouriteFruit: pineapple
    });

    // await amy.save();
    // await person.save();
    // await fruit.save();
    // await pineapple.save();
    // await Fruit.insertMany([orange, banana]);
    const fruits = await Fruit.find();
    console.log(fruits);
    // fruits.forEach(fruit => console.log(fruit.name));
    // await Fruit.deleteOne({name: "Pineapple"});
    // await Person.updateOne({name: "John"}, {favouriteFruit: kiwi});

    await mongoose.connection.close();
}