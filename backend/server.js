require('dotenv').config();
const dbConnect = require('./config/db');
dbConnect();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const auth = require('./routes/auth');
const exp = require('./routes/expenses');
const reports = require('./routes/reports');
const PORT = 3001;

app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/expenses', exp);
app.use('/api/reports', reports);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// FIX: Explicitly bind to localhost
app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.error('Failed to start server:', err);
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});