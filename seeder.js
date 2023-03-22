
const { users, options } = require("./data/sampleData");
const userModel = require("./models/User");
const optionModel = require("./models/Option");

const colors = require("colors");

const importData = async () => {
  try {
    //Inserts sameple users data
    await userModel.insertMany(users);
    //Inserts sample options data
    await optionModel.insertMany(options);
    console.log(colors.blue("Data inserted in database."));
  } catch (error) {
    console.log(colors.red(error));
  }
};

const destroyData = async () => {
  try {
    //Delete users data
    await userModel.deleteMany();
    //Delete options data
    await userModel.deleteMany();
    console.log(colors.blue('Data deleted successfully in database.'))
  } catch (error) {
    console.log(colors.red(error));
  }
};

module.exports = { importData, destroyData };
