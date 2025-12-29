let salas=[{valor:2,tipo:'privada'},{valor:5,tipo:'privada'},{valor:10,tipo:'publica'},{valor:20,tipo:'publica'},{valor:30,tipo:'publica'},{valor:40,tipo:'publica'},{valor:50,tipo:'publica'},{valor:100,tipo:'publica'}];

function carregarVagas(valor){let v=localStorage.getItem('vagas_'+valor); if(v===null){v=20; localStorage.setItem('vagas_'+valor,v);} return parseInt(v);}

function initSalas(){
  const c=document.getElementById('salasExistentes'); c.innerHTML='';
  salas.forEach(s=>{
    let v=carregarVagas(s.valor);
    let cor=s.tipo==='privada'?'#c8e6c9':'#a5d6a7';
    let ic=s.tipo==='privada'?'🔒':'👥';
    let d=document.createElement('div');
    d.className='sala'; d.style.background=cor;
    d.innerHTML=`<div class='icon'>${ic}</div><h3>${s.tipo==='privada'?'Privada':'Pública'} R$ ${s.valor}</h3><p><strong>Vagas:</strong> ${v}</p><button class='botao' ${v<=0?'disabled':''} onclick='entrarSala(${s.valor},"${s.tipo}")'>Participar</button>`;
    c.appendChild(d);
  });
}

function entrarSala(valor,tipo){
  let v=carregarVagas(valor); if(v<=0){alert('Sala cheia!');return;} v--; localStorage.setItem('vagas_'+valor,v);
  let u=JSON.parse(localStorage.getItem('usuario'))||{nome:'',email:''};
  let plataforma,criador,usuario;
  if(tipo==='privada'){plataforma=valor*0.10; criador=valor*0.05; usuario=valor-(plataforma+criador);} else {plataforma=valor*0.15; criador=0; usuario=valor-plataforma;}
  localStorage.setItem('ultimoPagamento',JSON.stringify({nome:u.nome,email:u.email,valor:valor,plataforma:plataforma,criador:criador,usuario:usuario}));
  window.location.href='pagamento.html';
  initSalas();
}

function carregarPagamento(){
  let d=JSON.parse(localStorage.getItem('ultimoPagamento'));
  if(d){document.getElementById('valor').innerText='Valor: R$ '+d.valor+',00';
  let t=`Nome: ${d.nome}\nEmail: ${d.email}\nPlataforma: R$ ${d.plataforma}`;
  if(d.criador>0) t+=`\nCriador: R$ ${d.criador}`; t+=`\nVocê: R$ ${d.usuario}`;
  document.getElementById('detalhes').innerText=t;}
}

function copiarPIX(){navigator.clipboard.writeText('pix@seudominio.com').then(()=>{alert('Chave PIX copiada!');});}

function voltarSalas(){window.location.href='salas.html';}

function carregarSaldo(){document.getElementById('saldo').innerText='Saldo disponível: R$ 0,00 (simulação)';}
function fazerSaque(){alert('Saque solicitado!');}
