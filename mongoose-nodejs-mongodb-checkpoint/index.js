require("dotenv").config({ quiet: true });

const mongoose = require("mongoose");
const Person = require("./models/person");

const mongoUri = process.env.MONGO_URI;

// Connect with the syntax requested in the checkpoint instructions.
function connectDB() {
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add your MongoDB Atlas URI to the private .env file.");
  }

  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Create one person, then save it with a Node-style callback.
function createAndSavePerson(done) {
  const person = new Person({
    name: "Amina",
    age: 24,
    favoriteFoods: ["pizza", "burritos"],
  });

  person.save(function (err, data) {
    done(err, data);
  });
}

// Insert several people at once for seed data.
function createManyPeople(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, data) {
    done(err, data);
  });
}

// Find every person matching the given name.
function findPeopleByName(personName, done) {
  Person.find({ name: personName }, function (err, data) {
    done(err, data);
  });
}

// Find one person who likes the given food.
function findOneByFood(food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    done(err, data);
  });
}

// Find one person by MongoDB document id.
function findPersonById(personId, done) {
  Person.findById(personId, function (err, data) {
    done(err, data);
  });
}

// Find a person, edit the food list, then save the same document.
function findEditThenSave(personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) {
      return done(err);
    }

    if (!person) {
      return done(null, null);
    }

    person.favoriteFoods.push("hamburger");

    return person.save(function (saveErr, data) {
      done(saveErr, data);
    });
  });
}

// Update one person by name and return the updated document.
function findAndUpdate(personName, done) {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function (err, data) {
      done(err, data);
    }
  );
}

// Delete one person by MongoDB document id.
function removeById(personId, done) {
  Person.findByIdAndRemove(personId, function (err, data) {
    done(err, data);
  });
}

// Delete all people named Mary and return the operation result.
function removeManyPeople(done) {
  Person.remove({ name: "Mary" }, function (err, data) {
    done(err, data);
  });
}

// Chain query helpers to find two burrito fans without showing their age.
function queryChain(done) {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      done(err, data);
    });
}

if (require.main === module) {
  try {
    connectDB()
      .then(function () {
        console.log("Connected to MongoDB. Import index.js functions to run checkpoint operations.");
        return mongoose.connection.close();
      })
      .catch(function (err) {
        console.error(err.message);
        process.exitCode = 1;
      });
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

module.exports = {
  connectDB,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
