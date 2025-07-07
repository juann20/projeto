let paginas = JSON.parse(localStorage.getItem('diarioPages')) || [{
    texto: "",
    data: new Date().toLocaleDateString('pt-BR')
  }];
  let paginaAtual = 0;
  let temaEscuro = localStorage.getItem('temaEscuro') === 'true';
  
  const campoTexto = document.getElementById('conteudoPagina');
  const modal = document.getElementById('modal');
  const todasNotas = document.getElementById('todasNotas');
  const infoData = document.getElementById('infoData');
  const infoPagina = document.getElementById('infoPagina');
  
  function atualizarPagina() {
    campoTexto.value = paginas[paginaAtual].texto;
    infoData.textContent = paginas[paginaAtual].data;
    infoPagina.textContent = `Página ${paginaAtual + 1} de ${paginas.length}`;
  }
  
  function salvarNoNavegador() {
    localStorage.setItem('diarioPages', JSON.stringify(paginas));
    localStorage.setItem('temaEscuro', temaEscuro);
  }
  
  function mudarTema() {
    document.body.style.backgroundColor = temaEscuro ? '#121212' : 'rgb(59, 11, 136)';
    document.body.style.color = temaEscuro ? 'white' : 'black';
    document.querySelector('.diario').style.borderColor = 'white';
  
    document.querySelectorAll('button').forEach(botao => {
      botao.style.backgroundColor = '#1a1a1a';
      botao.onmouseover = () => botao.style.backgroundColor = '#333';
      botao.onmouseout = () => botao.style.backgroundColor = '#1a1a1a';
    });
  }
  
  campoTexto.addEventListener('input', () => {
    paginas[paginaAtual].texto = campoTexto.value;
    salvarNoNavegador();
  });
  
  document.getElementById('proxima').addEventListener('click', () => {
    if (paginaAtual < paginas.length - 1) {
      paginaAtual++;
      atualizarPagina();
    }
  });
  
  document.getElementById('anterior').addEventListener('click', () => {
    if (paginaAtual > 0) {
      paginaAtual--;
      atualizarPagina();
    }
  });
  
  document.getElementById('nova').addEventListener('click', () => {
    paginas.push({
      texto: "",
      data: new Date().toLocaleDateString('pt-BR')
    });
    paginaAtual = paginas.length - 1;
    atualizarPagina();
    salvarNoNavegador();
  });
  
  document.getElementById('remover').addEventListener('click', () => {
    if (paginas.length > 1) {
      if (confirm('Tem certeza que deseja remover esta página?')) {
        paginas.splice(paginaAtual, 1);
        if (paginaAtual >= paginas.length) {
          paginaAtual = paginas.length - 1;
        }
        atualizarPagina();
        salvarNoNavegador();
      }
    } else {
      alert('Você não pode remover a última página!');
    }
  });
  
  document.getElementById('salvar').addEventListener('click', () => {
    alert('Salvo com sucesso!');
    salvarNoNavegador();
  });
  
  document.getElementById('verTudo').addEventListener('click', () => {
    todasNotas.innerHTML = paginas.map((pagina, i) => 
      `<p><strong>Página ${i + 1}:</strong> ${pagina.texto || '<em>Vazia</em>'} <br><small>${pagina.data}</small></p>`
    ).join('');
    modal.style.display = 'flex';
  });
  
  document.getElementById('fechar').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  document.getElementById('tema').addEventListener('click', () => {
    temaEscuro = !temaEscuro;
    mudarTema();
    salvarNoNavegador();
  });
  
  atualizarPagina();
  mudarTema();
  
