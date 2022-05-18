const someDiv = document.querySelector('.someJoke')
const heightLi = document.querySelector('.heightLi')
const weightLi = document.querySelector('.weightLi')
const abilities1 = document.querySelector('.abilities1')
const abilities2 = document.querySelector('.abilities2')
const abilitiesInfo1 = document.querySelector('.abilitiesInfo1')
const abilitiesInfo2 = document.querySelector('.abilitiesInfo2')
const imgDiv = document.querySelector('.imgDiv')
const catImg = document.querySelector('.catImg')
const form = document.forma
const imgCat = `https://http.cat/300`

const imgArr = [
  '/img/IMG_2187.JPG',
  '/img/IMG_2188.JPG',
  '/img/IMG_2189.JPG',
  '/img/IMG_2190.JPG',
  '/img/IMG_2191.JPG',
  '/img/IMG_2192.JPG'
]
// console.log(form)

const randomJoke = async (name) => {
  console.log('ssssssss');
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  // if (result.status )
  console.log('!!!!!!!@@@@@@',result.status);
  if(result.status === 200) {
  const jsonRes = await result.json()
  console.log('sssssssss',jsonRes);
  return jsonRes;
  } else {
    return 'nothing'
  }
}

const getAbility = async (res) => {
  const firstAbilities = await fetch(`${res.abilities[0].ability.url}`)
  const firstAbility = await firstAbilities.json()
  // console.log('First',firstAbilities);
  // console.log('Second',firstAbility);
  return firstAbility
}

const getAbility2 = async (res) => {
  const firstAbilities = await fetch(`${res.abilities[1].ability.url}`)
  const firstAbility = await firstAbilities.json()
  // console.log('First',firstAbilities);
  // console.log('Second',firstAbility);
  return firstAbility
}


// randomJoke('psyduck')
//   .then((res) => console.log(res))




// console.log(someDiv);




form?.addEventListener('submit', async (event) => {
  event.preventDefault()
  // console.log('ssssssssssssssssssss', event.target.pokemon.value);
  const pokemonName = event.target.pokemon.value.toLowerCase()
  const rndBackGr = Math.floor(Math.random() * 6)
  const joke = await randomJoke(pokemonName)
  console.log('!!!!!!!!!!!!!', joke);
  if (joke !== 'nothing') {
    // document.body.style.backgroundImage = ''
    document.body.style.backgroundImage = `url(${imgArr[rndBackGr]})`;
    someDiv.innerHTML = `<h2>${joke.name}<h2>`
    heightLi.innerText = joke.height / 10 + ' m'
    weightLi.innerText = joke.weight / 10 + ' kg'
    abilities1.innerHTML = `<h4>${joke.abilities[0]?.ability.name}:</h4>`
    abilities2.innerHTML = `<h4>${joke.abilities[1]?.ability.name}:</h4>`
    const newAbility = await getAbility(joke)
    const newAbility2 = await getAbility2(joke)
    abilitiesInfo1.innerText =  newAbility.effect_entries[1].effect
    abilitiesInfo2.innerText = newAbility2.effect_entries[1].effect
    imgDiv.style.backgroundImage = `url(${joke.sprites.other["official-artwork"].front_default})`
    event.target.pokemon.value = ''
    catImg.innerHTML = ''
  } else {
    someDiv.innerHTML = `<h2>Такой покемон не найден<h2>`
    catImg.innerHTML = '<img src="https://http.cat/404.jpg" alt="">'
    heightLi.innerText = ''
    weightLi.innerText = ''
    abilities1.innerText = ''
    abilities2.innerText = ''
    abilitiesInfo1.innerText = ''
    abilitiesInfo2.innerText = ''
    imgDiv.style.backgroundImage = ''
    // event.target.pokemon.value = ''
  }

  // console.log(joke);
  // console.log(pokemonName);
})
