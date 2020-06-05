
function populateUFs() {
  ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for(const state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
      }  
    })
}

populateUFs()


function populateCities(event) {
  citySelect = document.querySelector("select[name=city]");
  stateInput = document.querySelector("input[name=state]");
  
  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  citySelect.innerHTML = "<option value=''>Selecione a cadade</option>"
  citySelect.disabled = true


  url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
      }  

      citySelect.disabled = false;
    })  
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", populateCities)

// itens de coleta

const itemsCollect = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name=items]")

for( const item of itemsCollect ) { 
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []


function handleSelectedItem ( event ) {
  const itemLi = event.target

  const itemId = itemLi.dataset.id
  
  itemLi.classList.toggle("selected")


  const alreadySelect = selectedItems.findIndex( item => item == itemId)

  if(alreadySelect >= 0) {
    const filteredItems = selectedItems.filter( item => item != itemId) 

    selectedItems = filteredItems
  }else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}