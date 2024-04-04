let participantes = [
  {
    nome: "Paulo Henrique",
    email: "paulo.moura@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 19, 20),
    dataCheckin: new Date(2024, 2, 27, 00)
  },
  {
    nome: "Leony Acacio",
    email: "leony.acacio@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: null
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: new Date(2024, 2, 22, 00)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: new Date(2024, 2, 22, 00)
  },
  {
    nome: "Carla Santos",
    email: "carla.santos@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: null
  },
  {
    nome: "Pedro Sousa",
    email: "pedro.sousa@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: new Date(2024, 2, 22, 00)
  },
  {
    nome: "Mariana Costa",
    email: "mariana.costa@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: new Date(2024, 2, 22, 00)
  },
  {
    nome: "Rafaela Nunes",
    email: "rafaela.nunes@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: new Date(2024, 2, 22, 00)
  },
  {
    nome: "Gustavo Lima",
    email: "gustavo.lima@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: null
  },
  {
    nome: "Fernanda Rodrigues",
    email: "fernanda.rodrigues@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckin = dayjs(Date.now())
  .to(participante.dataCheckin)
  
  // condicional
  if(participante.dataCheckin == null) {
    dataCheckin = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
}

 // substituir informação do HTML
 document
 .querySelector('tbody')
 .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  // verirficar se o participante já existe
  const partipanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(partipanteExiste) {
    alert('Email já cadastrado!')
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false){
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckin = new Date()
  
  // atualizar a lista de participantes
  atualizarLista(participantes)
}