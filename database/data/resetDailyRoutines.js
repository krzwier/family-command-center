import { db } from "../../database/db-config.js";

const resetDailyRoutines = async () => {
   try {
      const routines = await db.raw(`UPDATE routine SET Completed = 0;`);

      console.log(`${Date()}: Daily routines were successfully reset.`);
   } catch (error) {
      console.log(`${Date()}: Error while attempting to reset daily routines. ${error.stack}`);
   }
};

resetDailyRoutines();
