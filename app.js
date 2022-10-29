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
    setRandomsChampions() //вызываем функцию замены цвета
  }
  // console.log(event.code)
})

//Блокировка персожана
//По клику нужно убрать опасити. добавить ID в setChamps в соотвествующий []
// document.addEventListener('click', (event) => {
//   const type = event.target.dataset.type //Свойство опускаем в нижний регистр (тк оно всегда в верхнем)
//   if (type === 'lock') {
//     //Если кликнули по блоку картинки
//     // const node =
//     //   event.target.tagName.toLowerCase() === 'i' //Если кликнули по символу замка то
//     //     ? event.target //
//     //     : event.target.children[0] //а если по фону замка то,то получаем первого ребенка из массива (сам символ значка)

//     // node.classList.toggle('fa-lock-open') //переключить замок (смену класса)
//     // node.classList.toggle('fa-lock')
//   }
// })

//Функция генерации № чемпиона
function generateRndChampion() {
  return Math.floor(Math.random() * dataChampions.length)
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
    // console.log(col)
    // console.log(index)
    //const isLocked = col.querySelector('i').classList.contains('fa-lock') //Проверка класса заблокирован или нет
    const lable = col.querySelector('.championName') // Находим место под имя
    const champImage = col.querySelector('.imgChamp')

    //Если ячейка блокирована на запись то пропустить шаг
    if (setChamps[index] != -1) {
      return
    }

    const championId = generateRndChampion() //генерируем № чемпиона
    //если в существующем на экране списке героев уже существует этот персонаж то рекурсия
    if (currentChamps.includes(championId) == false) {
      currentChamps[index] = championId
      console.log('Нет повтора')
    } else {
      //Рекурсия
      console.log('повтор')
    }
    ///.indexOf
    //Кудато нужно вписать id
    lable.textContent = dataChampions[championId][1] //вписываем в лейбл  championName
    champImage.children[0].src = dataChampions[championId][2]

    // if (isLocked) {
    //   //Если заблокирован то не менять
    //   colors.push(lable.textContent)
    //   return
    // }

    //console.log(image)

    // const color = isInitial
    //   ? colors[index]
    //     ? colors[index] //Проверка пустого массива
    //     : chroma.random() //то
    //   : chroma.random() //генерируем цвет с помощью доп библиотеки

    // if (!isInitial) {
    //   colors.push(color)
    // }

    // lable.textContent = 'Text' + index //вписываем в лейб  championName
    // champImage.children[0].src = '/images/STROGG_CUTOUT.png'

    //champImage.src = '/images/STROGG_CUTOUT.png' //вписываем путь к картинке
    //console.log(image)
    //col.style.background = color //делаем цвет фона
  })

  //updateColorsHash(colors)
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
