import app from "./index.js";

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))