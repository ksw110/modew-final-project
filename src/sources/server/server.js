const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "project-db-stu.ddns.net",
    user: "smhrd_A_5",
    password: "smhrd5",
    database: "smhrd_A_5",
    port: 3307 // 명시적으로 3307번 포트를 사용
  });
  
  
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


app.post("/user", (req, res) => {
  const { email, pw, name, birthday, tel, date } = req.body;

  connection.query(
    "INSERT INTO User (Email, Pw, Name, Birthday, Tel, Date) VALUES (?, ?, ?, ?, ?, NOW())",
    [email, pw, name, birthday, tel, date],
    function (err, rows, fields) {
      if (err) {
        console.log("DB저장 실패");
        res.send("DB저장 실패");
      } else {
        console.log("DB저장 성공");
        res.send("DB저장 성공");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});