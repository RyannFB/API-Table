import express from 'express';
import { minimum, maximum } from './numberUtils.js';
import { lowercase, uppercase } from './textUtils.js';

const app = express();
const port = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve arquivos estáticos, como o Bootstrap

// Rota principal que gera o HTML dinâmico
app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aplicação de Manipulação</title>
      <!-- Bootstrap -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="container my-5">
        <h1 class="text-center mb-5">Manipulação de Texto e Números</h1>

        <!-- Formulário para manipulação de texto -->
        <div class="mb-5">
          <h3>Manipulação de Texto</h3>
          <form action="/text" method="POST">
            <div class="mb-3">
              <label for="input-text" class="form-label">Digite seu texto:</label>
              <input type="text" class="form-control" id="input-text" name="input" placeholder="Digite seu texto" required>
            </div>
            <div class="mb-3">
              <label for="action-text" class="form-label">Escolha uma ação:</label>
              <select class="form-select" id="action-text" name="action" required>
                <option value="lowercase">Minúsculo</option>
                <option value="uppercase">Maiúsculo</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>

        <!-- Formulário para operações numéricas -->
        <div>
          <h3>Operações Numéricas</h3>
          <form action="/number" method="GET">
            <div class="mb-3">
              <label for="input-numbers" class="form-label">Digite os números (separados por vírgula):</label>
              <input type="text" class="form-control" id="input-numbers" name="input" placeholder="Exemplo: 1,2,3,4" required>
            </div>
            <div class="mb-3">
              <label for="action-number" class="form-label">Escolha uma operação:</label>
              <select class="form-select" id="action-number" name="action" required>
                <option value="minimum">Mínimo</option>
                <option value="maximum">Máximo</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>

      <!-- Bootstrap JS -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `;
  res.send(htmlContent);
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
    return res.status(400).send('Ação inválida');
  }

  res.send(`<h3>Resultado: ${outputText}</h3><a href="/">Voltar</a>`);
});

// Rota para operações numéricas
app.get('/number', (req, res) => {
  const { action, input } = req.query;

  if (!input) {
    return res.status(400).send('Por favor, forneça números');
  }

  const numbers = input.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).send('Entrada de números inválida');
  }

  let outputNumber;
  if (action === 'minimum') {
    outputNumber = minimum(numbers);
  } else if (action === 'maximum') {
    outputNumber = maximum(numbers);
  } else {
    return res.status(400).send('Ação inválida');
  }

  res.send(`<h3>Resultado: ${outputNumber}</h3><a href="/">Voltar</a>`);
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
