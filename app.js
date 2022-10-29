const colums = document.querySelectorAll('.champion_card')

//ID, name, img_path
let dataChampions = [
  [0, 'Anarki', '/images/anarki.png'],
  [1, 'Blazkowicz', '/images/bj-blazkowicz-skin-one--400.png'],
  [2, 'Athena', '/images/athena_skin_one.png'],
  [3, 'Vizor', '/images/visor-iso.png'],
  [4, 'GALENA', '/images/champ6-iso.png'],
  [5, 'Sorlag', '/images/champ8-iso.png'],
  [6, 'Slash', '/images/champions-isolated_SLASH_crop.png'],
  [7, 'clutch', '/images/clutch.png'],
  [8, 'death knight', '/images/death_knight.png'],
  [9, 'Doom', '/images/DOOM_Slayer_Bigger.png'],
  [10, 'Eisen', '/images/Eisen-transparency-7.png'],
  [11, 'Keel', '/images/Keel_Transparent.png'],
  [12, 'Nyx', '/images/nyx-iso.png'],
  [13, 'Ranger', '/images/Ranger_Mortal_Set__282_29.png'],
  [14, 'ScaleBearer', '/images/scalebearer-iso.png'],
  [15, 'Strogg', '/images/STROGG_CUTOUT.png'],
]

let currentChamps = [-1, -1, -1] //если -1 то страница не загружена. тут хранятся текущие для избежания повтора. ОЗУ
let setChamps = [-1, -1, -1] //Здесь хранятся ячейки которые зафиксированны. ПЗУ

//Отслеживает нажатий клавиатуры
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    //Если нажали проблел то сбросить цвета
    setRandomsChampions() //вызываем функцию замены чемпиона
  }
  // console.log(event.code)
})

//Блокировка персожана
//По клику нужно убрать прозрачность. добавить ID в setChamps в соотвествующий []
document.addEventListener('click', (event) => {
  if (event.target.parentNode.className == 'imgChamp') {
    selectClickedChampion(event.target.parentNode.parentNode.id) //Шелкнули прямо на картинку
  } else if (event.target.parentNode.className == 'champion_card') {
    selectClickedChampion(event.target.parentNode.id) //Шелкнули на поле карточки
  }
})

//Функция выбора героя по id карточки
function selectClickedChampion(nodeId) {
  let iD = nodeId.replace('card_', '') //обрезаем класс
  if (setChamps[iD] === -1) {
    setChamps[iD] = currentChamps[iD] //по классу 0 1 2 присваиваем выбор героя
    adddelAnimationSelect(nodeId, true)
  } else {
    setChamps[iD] = -1
    adddelAnimationSelect(nodeId, false)
  }
}

//Функция анимирования выбора чемпиона
function adddelAnimationSelect(nodein, selONF) {
  // Надо найти элемент в дом дереве с таким классом
  const findIdCard = document.querySelector('#' + nodein) //найти чилдрен  imgChamp и изменить ему прозрачность
  if (selONF == true) {
    findIdCard.querySelector('.imgChamp').style.opacity = '1'
    findIdCard.querySelector('.championName').style.color = 'blue'
    findIdCard.querySelector('.championName').style.textShadow =
      '4px 3px 0px #7A7A7A, 0px 9px 15px rgba(16,0,206,0.77);'
  } else {
    findIdCard.querySelector('.imgChamp').style.opacity = '0.7'
    findIdCard.querySelector('.championName').style.color = 'crimson'
    findIdCard.querySelector('.championName').style.textShadow = ''
  }

  //championName сменить цвет и придать анимацию выбора взрыв или типа того
}

//Функция генерации № чемпиона
function generateRndChampion() {
  let rndvalue = Math.floor(Math.random() * dataChampions.length)
  if (currentChamps.includes(rndvalue)) {
    rndvalue = generateRndChampion() //С помощью рекурсии добиваемся работы без повторов
  }
  return rndvalue
}

//Установка сгенерированных чемпионов
function setRandomsChampions() {
  //const colors = isInitial ? getColorsfromHash() : []
  //const test = isInitial ? console.log('вошли в цикл') : console.log('dsad')
  currentChamps = [-1, -1, -1] // выполняем сброс текущих
  //Далее надо заменить элементы массива что в массиве выбранных(setChamps) != -1
  setChamps.forEach((setCmp, index) => {
    if (setCmp != currentChamps[index]) currentChamps[index] = setCmp
  })

  colums.forEach((col, index) => {
    const lable = col.querySelector('.championName') // Находим место под имя
    const champImage = col.querySelector('.imgChamp')

    //Если ячейка блокирована на запись то пропустить шаг
    if (setChamps[index] != -1) {
      return
    }

    const championId = generateRndChampion() //генерируем № чемпиона

    currentChamps[index] = championId //Вписываем id
    lable.textContent = dataChampions[championId][1] //вписываем в лейбл  championName
    champImage.children[0].src = dataChampions[championId][2]
  })
}

/*
//Переключение замка
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type //Свойство опускаем в нижний регистр (тк оно всегда в верхнем)
  if (type === 'lock') {
    //Если кликнули по значку замка
    const node =
      event.target.tagName.toLowerCase() === 'i' //Если кликнули по символу замка то
        ? event.target //
        : event.target.children[0] //а если по фону замка то,то получаем первого ребенка из массива (сам символ значка)

    node.classList.toggle('fa-lock-open') //переключить замок (смену класса)
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent) //Если нажали на
  }
})




function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1)
    })
    .join('-')
}

function getColorsfromHash() {
  if (document.location.hash.length > 1) {
    document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color)
  }
  return []
}



*/
setRandomsChampions() //вызываем функцию создания рандомной тройки
