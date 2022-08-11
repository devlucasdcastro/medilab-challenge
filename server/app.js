const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const fs = require("fs");
app.use(cors());

app.get("/api/users", (req, res) => {
  fs.readFile("./data/data.json", (err, json) => {
    let obj = JSON.parse(json);
    let objFiltered = obj;
    if (req.query.patientID != undefined && req.query.patientID != "") {
      objFiltered = objFiltered.filter((x) => {
        return x.patientID == req.query.patientID;
      });
    }
    if (req.query.nome != undefined && req.query.nome != "") {
      objFiltered = objFiltered.filter((x) => {
        return x.nome.toLowerCase() == req.query.nome.toLowerCase();
      });
    }
    if (req.query.numero != undefined && req.query.numero != "") {
      objFiltered = objFiltered.filter((x) => {
        return x.numero == req.query.numero;
      });
    }
    if (req.query.tipoExame != undefined && req.query.tipoExame != "") {
      objFiltered = objFiltered.filter((x) => {
        return x.tipoExame.toLowerCase() == req.query.tipoExame.toLowerCase();
      });
    }
    if (req.query.modalidade != undefined && req.query.modalidade != "") {
      objFiltered = objFiltered.filter((x) => {
        return x.modalidade.toLowerCase() == req.query.modalidade.toLowerCase();
      });
    }
    if (req.query.data != undefined && req.query.data != "") {
      objFiltered = objFiltered.filter((x) => {
        return x.data == req.query.data;
      });
    }
    let estados = {
      1: '<a style="cursor:pointer"> Ler Manamnese </a>',
      2: '<a style="cursor:pointer">Responder Questionário </a>',
      default: "Sem visualização disponível",
    };
    for (let i = 0; i < objFiltered.length; i++) {
      objFiltered[i].estado = estados[objFiltered[i].estado] || estados.default;
    }
    res.json(objFiltered);
  });
});

app.listen(port, () => {
  console.log(`Servidor funcionando na porta: ${port}`);
});
