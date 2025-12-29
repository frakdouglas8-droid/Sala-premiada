// Salvar e verificar usuários
function salvarUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function getUsuario() {
    return JSON.parse(localStorage.getItem('usuario'));
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('senha').value.trim();
    let usuario = getUsuario();
    if(!usuario || usuario.email !== email || usuario.senha !== senha){
        alert("Usuário ou senha incorretos!");
        return;
    }
    window.location.href = 'salas.html';
});

// Cadastro
document.getElementById('cadastroForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    let senha = document.getElementById('senha').value.trim();
    if(!nome || !email || !senha){ alert('Preencha todos os campos obrigatórios!'); return; }
    salvarUsuario({nome,email,telefone,senha,saldo:0});
    alert("Cadastro realizado com sucesso!");
    window.location.href='login.html';
});

// Recuperar senha
function recuperarSenha(){
    let usuario = getUsuario();
    if(!usuario) return alert("Nenhum usuário cadastrado.");
    alert(`Sua senha é: ${usuario.senha}`);
}

// Salas
let salas = [
    {id:1, nome:"R$2", vagas:20, participantes:0},
    {id:2, nome:"R$5", vagas:20, participantes:0},
    {id:3, nome:"R$10", vagas:20, participantes:0},
    {id:4, nome:"R$20", vagas:20, participantes:0},
    {id:5, nome:"R$50", vagas:20, participantes:0},
    {id:6, nome:"R$100", vagas:20, participantes:0}
];

function atualizarSalas(){
    let container = document.getElementById('salasList');
    if(!container) return;
    container.innerHTML='';
    salas.forEach(sala=>{
        let div = document.createElement('div');
        div.className = `card ${sala.nome==='R$2'?'red':sala.nome==='R$5'?'blue':sala.nome==='R$10'?'green':sala.nome==='R$20'?'yellow':sala.nome==='R$50'?'orange':'purple'}`;
        div.id = `sala-${sala.id}`;
        div.innerText = `${sala.nome}\nVagas: ${sala.vagas - sala.participantes}`;
        div.onclick = ()=>entrarSala(sala.id);
        container.appendChild(div);
    });
}

function entrarSala(idSala){
    let sala = salas.find(s=>s.id===idSala);
    if(!sala) return alert("Sala não encontrada!");
    if(sala.participantes >= sala.vagas) return alert("Sala cheia!");
    sala.participantes += 1;
    alert(`Você entrou na sala ${sala.nome}. Vagas restantes: ${sala.vagas - sala.participantes}`);
    atualizarSalas();
}

atualizarSalas();
