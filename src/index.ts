import express from "express"
const app = express()

const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})