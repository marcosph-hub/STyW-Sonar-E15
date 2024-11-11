import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";

const { ATLAS_URI } = process.env;
const app = express();

// Settings 
dotenv.config();
app.set('port', process.env.PORT || 5200);

// Middleware

// Routes

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    // const app = express();
    app.use(cors());

    // start the Express server
    app.listen(app.get('port'), () => {
      console.log(`Server running at http://localhost:`, app.get('port'));
    });
  })
  .catch((error) => console.error(error));
