import express from "express";

const app = express();
const PORT = 3030;

app.use(express.json());

const diakok = [
  { id: 1, name: "Ann", subject: "maths" },
  { id: 2, name: "Bob", subject: "IT" },
  { id: 3, name: "Cloe", subject: "PE" },
];

app.get("/students/:id", (req, res) => {
  const id = +req.params.id;
  const diak = diakok.find((x) => x.id === id);
  if (!diak) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(diak);
});

app.post("/students", (req, res) => {
  const { name, subject } = req.body;
  if (!name || !subject) {
    return res.status(400).json({ message: "Name and subject are required" });
  }
  const id = diakok[diakok.length - 1]?.id + 1;
  const diak = { id, name, subject };
  diakok.push(diak);
  res.status(201).json(diak);
});

app.put("/students/:id", (req, res) => {
  const id = +req.params.id;
  const diak = diakok.find((x) => x.id === id);
  if (!diak) {
    return res.status(404).json({ message: "Student not found" });
  }
  const { name, subject } = req.body;
  if (!name || !subject) {
    return res.status(400).json({ message: "Name and subject are required" });
  }
  diakok.name = name;
  diakok.subject = subject;
  const ujdiak = diakok.find((x) => x.id === id);
  res.status(200).json(ujdiak);
});

app.listen(PORT, () => {
  console.log(`Server runs on port: ${PORT}`);
});
