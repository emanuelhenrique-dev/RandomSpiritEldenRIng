const difList = document.querySelector('.generator .options');
const difCards = document.querySelectorAll('.generator .options li');

let dif = 5;
let DLC_Active = false;

//deixar selecionado uma das facilidades
difList.addEventListener('click', (e) => {
  const option = e.target;

  if (option.tagName == 'LI') {
    option.classList.add('active');
    dif = option.id;

    for (let i = 0; i < difCards.length; i++) {
      if (difCards[i].id !== option.id) {
        difCards[i].classList.remove('active');
      }
    }
  }
});

//deixar selecionado se quiser que apareca summons da dlc
const dlcActive = document.querySelector('.generator .toggleDlc');

dlcActive.addEventListener('click', (e) => {
  const option = e.target;

  option.classList.toggle('active');
  DLC_Active = !DLC_Active;
});

//button gerar e adicionar no array

const gerarButton = document.querySelector('.generator button');

let tempList = [];

gerarButton.addEventListener('click', (e) => {
  console.log(dif);
  tempList = [];
  let Spirits = spiritList.length;

  // verificar se e um espirito de dlc e se ta ativo
  if (!DLC_Active) {
    Spirits = spiritList.length - 20;
  }

  for (let i = 0; i < 3; ) {
    const random = Math.floor(Math.random() * Spirits);
    console.log('random:' + random);

    if (spiritList[random].dif >= dif && spiritList[random].dif != 0) {
      tempList.push(spiritList[random]);
      i++;
    } else if (spiritList[random].dif == 0 && dif == 1) {
      tempList.push(spiritList[random]);
      i++;
    }
  }

  console.log(tempList);
  listarCards();
});

//listar os cards dos espiritos
const spiritCards = document.querySelector('.cards ul');
function listarCards() {
  console.log('listado');

  spiritCards.innerHTML = `
    <li id="0">
      <div class="close">
        <img class="delete" id="0" src="./assets/close.svg" alt="" />
      </div>
      <img src="${tempList[0].img}" alt="" />
      <h3>${tempList[0].name}</h3>
      <a href="${tempList[0].Link}" target="_blank"
        ><img src="./assets/link.svg" alt=""
      /></a>
    </li>
    <li id="1">
      <div class="close">
        <img class="delete" id="1" src="./assets/close.svg" alt="" />
      </div>
      <img src="${tempList[1].img}" alt="" />
      <h3>${tempList[1].name}</h3>
      <a href="${tempList[1].Link}" target="_blank"
        ><img src="./assets/link.svg" alt=""
      /></a>
    </li>
    <li id="2">
      <div class="close">
        <img class="delete" id="2" src="./assets/close.svg" alt="" />
      </div>
      <img src="${tempList[2].img}" alt="" />
      <h3>${tempList[2].name}</h3>
      <a href="${tempList[2].Link}" target="_blank"
        ><img src="./assets/link.svg" alt=""
      /></a>
    </li>
  `;
}

//apagar selecionado
spiritCards.addEventListener('click', (e) => {
  const item = e.target;
  let id = '';

  if (item.className == 'delete') {
    console.log('deletar');
    console.log(item.id);
    id = tempList[item.id].id;
    subst(item.id, id);
    console.log(tempList);
    listarCards();
  }
});

//substituir spirit sem ser o mesmo
function subst(id, oldId) {
  let found = false;

  while (!found) {
    const random = Math.floor(Math.random() * spiritList.length);
    console.log('novo =' + spiritList[random].id);
    console.log('velho =' + oldId);
    if (spiritList[random].dif >= dif && spiritList[random].dif != 0) {
      tempList.splice(id, 1, spiritList[random]);
      if (spiritList[random].dif >= dif) {
        found = true;

        if (spiritList[random].dif == 6) {
          found = DLC_Active;
        }
      } else {
        found = false;
      }
    } else if (spiritList[random].dif == 0 && dif == 1) {
      tempList.splice(id, 1, spiritList[random]);
      found = true;
    }

    if (spiritList[random].id == oldId) {
      console.log(' no Found spirit');
      found = false;
    }
  }
}

//volume do back
let vid = document.querySelector('audio');
vid.volume = 0.3;
