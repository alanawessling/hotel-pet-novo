# 1. O que é uma função assíncrona?

É uma função que faz uma tarefa que pode demorar um pouco, como buscar dados em uma API.

# 2.  Por que buscar dados de uma API é uma operação assíncrona?

Porque o programa precisa esperar a API responder.

# 3. ?O que é uma Promise? 

É algo que representa uma tarefa que ainda está acontecendo e depois vai ter um resultado.

# 4. O que significam os estados , e ?

- pending: ainda está esperando.
- fulfilled: deu certo.
- rejected: deu errado.

# 5. Para que servem async e await?

O `async` indica que a função é assíncrona e o `await` faz o código esperar a resposta.

# 6. O que acontece com a execução da função enquanto ela aguarda uma resposta?

Ela espera a resposta chegar e depois continua o código.

# 7. O que a Fetch API faz?

Ela serve para buscar ou enviar dados para uma API.

# 8. Qual é a diferença entre fetch(url) e resposta.json()?

O `fetch()` busca os dados e o `json()` pega esses dados para usar no código.

# 9. Como podemos tratar um erro quando a API não responde ou retorna um resultado inválido?

Podemos usar `try` e `catch` para descobrir quando acontece um erro e mostrar uma mensagem.