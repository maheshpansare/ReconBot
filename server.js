const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/run-command', (req, res) => {
    const { command } = req.body;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ output: stderr });
        } else {
            res.status(200).json({ output: stdout });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
