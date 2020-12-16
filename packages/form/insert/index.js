const mongoose = require("mongoose");
const DB_Username = process.env.DB_Username; //getting credentials from Environment variables
const DB_Password = process.env.DB_Password;
const DB_Name = process.env.DB_Name;
const DB_ClusterUri = process.env.DB_ClusterUri;
const DATABASEURI = `mongodb+srv://${DB_Username}:${DB_Password}@${DB_ClusterUri}/${DB_Name}?retryWrites=true&w=majority`;

mongoose
  .connect(DATABASEURI, {
    //Establishing connection with MongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongo database"))
  .catch((e) => console.error(e));

  const form = mongoose.model("records", {
    //Creating Form Model
    name: { type: String },
    email: { type: String },
    message: { type: String },
  });

async function main(args) {
  response = new Object();
  try {
    var myForm = new form({
      name: args.name,
      email: args.email,
      message: args.message,
    });

    // save model to database
    insertionResponse = await myForm.save();
    if (insertionResponse.name) {
      response.body = { message: 'Hi '+insertionResponse.name+'! Thanks for Submitting', success: true };
    } else {
      response.body = {
        message: "Error while inserting record",
        success: false,
      };
    }
    response.statusCode = 200;
  } catch (err) {
    response.body = {
      message: "Exception has occured while processing",
      success: false,
    };
    response.statusCode = 400;
  }
  console.log(response);
  return response;
}
module.exports = { main };

