const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Create table if not exists
pool.query(`
CREATE TABLE IF NOT EXISTS messages(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT
)
`)
.then(()=>console.log("Table ready"))
.catch(err=>console.error("Table error:", err));

// API to save message
app.post("/contact", async (req,res)=>{
  try{
    const {name,email,message}=req.body;

    await pool.query(
      "INSERT INTO messages(name,email,message) VALUES($1,$2,$3)",
      [name,email,message]
    );

    res.status(200).json({
      success:true,
      message:"Message saved successfully"
    });

  }catch(err){
    console.error(err);
    res.status(500).json({
      success:false,
      message:"Database error"
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{
  console.log("Server running on port "+PORT);
});