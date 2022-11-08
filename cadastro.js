const nameLogin = document.getElementById("input-login")
const senha1 = document.getElementById("input-senha")
const senhaRepetida = document.getElementById("input-senha1")
const formulario = document.querySelector(".forms")
let usuarios = JSON.parse(localStorage.getItem('infoLista') ?? '[]')

formulario.addEventListener('submit', (event) => {
  event.preventDefault()
  cadastroUsuario()
})

function cadastroUsuario() {

  const userExistente = usuarios.some((dado) => dado.nome === nameLogin.value)
  if (userExistente) {
    alert("Nome de usuário já existente !")
    return

  }
  if (senha1.value !== senhaRepetida.value) {
    alert("As senhas devem ser iguais")
    return
  }

  const usuario = {
    nome: nameLogin.value,
    senha: senha1.value,
    recados: []
  }

  usuarios.push(usuario)
  localStorage.setItem('infoLista', JSON.stringify(usuarios))

  alert("Conta cadastrada com sucesso !")
  window.location.href = "index.html"
}


