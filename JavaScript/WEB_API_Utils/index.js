import express from 'express';
import { minimum, maximum } from './numberUtils.js';
import { lowercase, uppercase } from './textUtils.js';

const app = express();
const port = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para permitir o recebimento de JSON
app.use(express.static('public')); // Serve arquivos estáticos, como o Bootstrap

// Rota principal que gera o JSON dinâmico
app.get('/', (req, res) => {
  const response = {
    message: "Bem-vindo à Aplicação de Manipulação",
    textManipulation: {
      description: "Manipulação de Texto",
      form: {
        inputPlaceholder: "Digite seu texto",
        actions: [
          { value: "lowercase", label: "Minúsculo" },
          { value: "uppercase", label: "Maiúsculo" }
        ]
      }
    },
    numberOperations: {
      description: "Operações Numéricas",
      form: {
        inputPlaceholder: "Exemplo: 1,2,3,4",
        actions: [
          { value: "minimum", label: "Mínimo" },
          { value: "maximum", label: "Máximo" }
        ]
      }
    }
  };
  res.json(response);
});

// Rota para manipulação de texto
app.post('/text', (req, res) => {
  const { action, input } = req.body;
  let outputText;

  // Validando a ação de texto
  if (action === 'lowercase') {
    outputText = lowercase(input);
  } else if (action === 'uppercase') {
    outputText = uppercase(input);
  } else {
    return res.status(400).json({ error: 'Ação inválida' });
  }

  res.json({ result: outputText });
});

// Rota para operações numéricas
app.get('/number', (req, res) => {
  const { action, input } = req.query;

  if (!input) {
    return res.status(400).json({ error: 'Por favor, forneça números' });
  }

  const numbers = input.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Entrada de números inválida' });
  }

  let outputNumber;
  if (action === 'minimum') {
    outputNumber = minimum(numbers);
  } else if (action === 'maximum') {
    outputNumber = maximum(numbers);
  } else {
    return res.status(400).json({ error: 'Ação inválida' });
  }

  res.json({ result: outputNumber });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
