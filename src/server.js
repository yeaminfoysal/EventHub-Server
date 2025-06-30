const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const port = 3000;
// ...existing code...

let server;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ucdi4.mongodb.net/EventHubDB?retryWrites=true&w=majority&appName=Cluster0`);
        server = app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};

main();