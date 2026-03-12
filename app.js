import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

const exams = [
  { id: 1, subject: "literature", level: "intermedia" },
  { id: 2, subject: "maths", level: "advanced" },
  { id: 3, subject: "history", level: "intermedia" },
];

app.get("/exams", (req, res) => {
  res.status(200).json(exams);
});

app.get("/exams/:id", (req, res) => {
  const id = +req.params.id;
  const exam = exams.find((x) => x.id === id);
  if (!exam) {
    return res.status(404).json({ message: "Exam not found" });
  }
  res.status(200).json(exam);
});

app.post("/exams", (req, res) => {
  const { subject, level } = req.body;
  if (!subject || !level) {
    return res.status(400).json({ message: "Subject and level are required" });
  }
  const id = exams[exams.length - 1]?.id + 1;
  const exam = { id, subject, level };
  exams.push(exam);
  res.status(201).json(exam);
});

app.put("/exams/:id", (req, res) => {
  const id = +req.params.id;
  const exam = exams.find((x) => x.id === id);
  if (!exam) {
    return res.status(404).json({ message: "Exam not found" });
  }
  const { subject, level } = req.body;
  if (!subject || !level) {
    return res.status(400).json({ message: "Subject and level are required" });
  }
  exam.subject = subject;
  exam.level = level;
  res.status(200).json({ message: "Exam updated" });
});

app.delete("/exams/:id", (req, res) => {
  const id = +req.params.id;
  const exam = exams.find((x) => x.id === id);
  if (!exam) {
    return res.status(404).json({ message: "Exam not found" });
  }
  const index = exams.indexOf(exam);
  exams.splice(index, 1);
  res.status(200).json({ message: "Delete success" });
});

app.listen(PORT, () => {
  console.log(`Server runs on port: ${PORT}`);
});
