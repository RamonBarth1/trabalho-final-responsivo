let inputDescricao = document.getElementById("descricao")
let detalhamento = document.getElementById("detalhamento")
let botaoSair = document.getElementById('buttonSair')
let usuarioLogadoOn = JSON.parse(localStorage.getItem('usuarioLogado'))

const form = document.getElementById("form-recados")
form.addEventListener('submit', (event) => {
  event.preventDefault();
  salvarRecados()
})

document.addEventListener('DOMContentLoaded', () => {
  if (!usuarioLogadoOn) {
    alert("Você não tem acesso a essa área, por favor faça login")
    window.location.href = "cadastro.html"
  }

  criarRecados(usuarioLogadoOn)
})

botaoSair.addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('infoLista'))
  const indice = user.findIndex((user) => user.nome === usuarioLogadoOn.nome)

  user[indice] = usuarioLogadoOn
  localStorage.setItem('infoLista', JSON.stringify(user))

  localStorage.removeItem('usuarioLogado')
  window.location.href = "index.html"
})


//Salvar Recados

function salvarRecados() {
  recadoHTML = {
    id: Math.floor((Math.random() * 1004.75) + 7),
    descricao: descricao.value,
    detalhamento: detalhamento.value
  }

  usuarioLogadoOn.recados.push(recadoHTML)
  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogadoOn))
  criarRecados(usuarioLogadoOn)

  form.reset();

}

//Criar Recados
function criarRecados(valor) {

  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  valor.recados.forEach(dado => {
    const linhaTr = document.createElement('tr')
    linhaTr.setAttribute('style', 'border: 0.02px solid #d7d7d7;')
    linhaTr.setAttribute('id', dado.id)

    const idRecado = document.createElement('td')
    idRecado.setAttribute('class', 'col-sm-5');
    idRecado.innerText = dado.id

    const descricaoRecado = document.createElement('td')
    descricaoRecado.setAttribute('class', 'col-sm-4');
    descricaoRecado.innerText = dado.descricao

    const detalhamentoRecado = document.createElement('td')
    detalhamentoRecado.setAttribute('class', 'col-sm-1');
    detalhamentoRecado.innerText = dado.detalhamento

    const botaoEditar = document.createElement('button')
    botaoEditar.setAttribute('type', 'button')
    botaoEditar.setAttribute('class', 'buttonRecados')
    botaoEditar.setAttribute('class', 'btn-ms px-3')
    botaoEditar.setAttribute('style', 'color: #fff')
    botaoEditar.innerText = 'Editar'
    botaoEditar.addEventListener('click', () => {
      if (botaoEditar.innerText === 'Editar') {
        editarRecados(dado, botaoEditar, botaoExcluir)
      } else {
        atualizar(dado, botaoEditar, botaoExcluir)
      }
    })

    const botaoExcluir = document.createElement('button')
    botaoExcluir.setAttribute('type', 'button')
    botaoExcluir.setAttribute('class', 'buttonRecados')
    botaoExcluir.setAttribute('class', 'btn-ms px-3')
    botaoExcluir.setAttribute('style', 'color: #fff')
    botaoExcluir.innerText = 'Excluir'

    botaoExcluir.addEventListener('click', () => {
      if (botaoExcluir.innerText == 'Cancelar') {
        editarRecados()
      } else {
        excluirRecados(dado)
      }
    })

    linhaTr.appendChild(idRecado);
    linhaTr.appendChild(descricaoRecado);
    linhaTr.appendChild(detalhamentoRecado);
    linhaTr.appendChild(botaoEditar);
    linhaTr.appendChild(botaoExcluir)
    tbody.appendChild(linhaTr)
  });


}

//Editar Recados
function editarRecados(value, editar, excluir) {
  editar.innerText = 'Atualizar'
  editar.setAttribute('style', 'background: black')
  editar.setAttribute('style', 'color: #fff')


  descricao.value = value.descricao,
    detalhamento.value = value.detalhamento

  excluir.innerText = 'Cancelar'
  excluir.setAttribute('style', 'background: #black')
  excluir.setAttribute('style', 'color: #fff')

  excluir.addEventListener('click', () => {
    editar.innerText = 'Editar'
    editar.setAttribute('style', 'color: #fff')
    excluir.innerText = 'Excluir'
    excluir.setAttribute('style', 'color: #fff')

  })
}

//Excluir recados
function excluirRecados(dado) {
  document.getElementById(`${dado.id}`).remove()
  recadosAtualizado = usuarioLogadoOn.recados.filter((recado) => recado.id !== dado.id)

  usuarioLogadoOn.recados = recadosAtualizado
  console.log(recadosAtualizado)

  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogadoOn))
}


//Atualizar(button)
function atualizar(dados, editar, excluir) {

  const indiceRecado = usuarioLogadoOn.recados.findIndex((dado) => dado.id === dados.id)


  let recadoAtt = {
    id: dados.id,
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  }

  usuarioLogadoOn.recados[indiceRecado] = recadoAtt
  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogadoOn))

  location.reload()

  editar.innerText = 'Editar'
  excluir.innerText = 'Excluir'

  form.reset()
}
