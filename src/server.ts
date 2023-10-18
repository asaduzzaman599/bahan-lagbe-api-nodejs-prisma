import { Request, Response } from "express";
import app from "./app";
import config from "./config"

async function main() {
  const PORT = config.PORT || 5000;
  
  app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
  })
}

main();
