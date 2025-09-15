import { menuArray }from './data.js'

const menuEl = document.getElementById('menu')
const order = document.getElementById('order')
const payBtn = document.getElementById('pay-btn')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close-btn')
const orderForm = document.getElementById('order-form')


const filepathBG = 'burger.png'
document.body.style.backgroundImage = `url(${filepathBG})`


menuEl.innerHTML = menuArray.map(item => `
  <div class="menu-item">
    <div>
      <div style="font-size:2rem;">${item.emoji}</div>
      <strong class = 'item'>${item.name}</strong> - ₹${item.price}
      <div class ='sub'>${item.ingredients.join(", ")}</div>
    </div>
    <button class="add-btn" data-id="${item.id}">+</button>
  </div>
`).join('')



let orderArray = []

document.addEventListener("click", function(e) {

   handeleAddBtnClick(e)
   handleRemoveBtnClick(e)
   completeorderBtnClick(e)

  function handeleAddBtnClick(e) {
    if (e.target.dataset.id && e.target.classList.contains('add-btn')) {
      const itemId = Number(e.target.dataset.id)
      const existingItem = orderArray.find(function(item){
        return item.id == itemId
      })
      if (existingItem) {
        existingItem.quantity += 1
      }
      else {
        const targetItemObj = menuArray.find(function(item) {
          return item.id == itemId
        })
        orderArray.push(targetItemObj)
      }   
      renderOrder()     
    }
  }

  
  function handleRemoveBtnClick(e) {
  if (e.target.dataset.id && e.target.classList.contains('remove-btn')) {
    const itemId = Number(e.target.dataset.id)   // convert string → number
    const removeItem = orderArray.find(function(item){
      return item.id == itemId
    })
    if (removeItem.quantity > 1) {
      removeItem.quantity -= 1
    } else {
      orderArray = orderArray.filter(function(item){
        return item.id != itemId
      })
    }
    renderOrder()

  }
}

})

function renderOrder() {
  let totalPrice = 0
  order.innerHTML = ''
  orderArray.forEach(function(item){
    const itemTotal = item.price * item.quantity
    totalPrice += itemTotal
    order.innerHTML += `
      <div class="order-item">
        <div style="font-size:2rem;">
        <span>
        <div class='item'>${item.name} (x${item.quantity})
        <span><button class="remove-btn" data-id="${item.id}">
        -</button></span></div>
        </span>
        </div>
        <div class='price'>₹${item.price}</div>
      </div>
    `
  })
    if (orderArray.length > 0) {
      order.innerHTML += `
        <div class="total-price">
          <strong>Total price: ₹${totalPrice}</strong>
          <button id="pay-btn">COMPLETE ORDER</button>
        </div>
        
      `
    } else {
      order.innerHTML = '<p>Your order is empty.</p>'
    } 
    if (document.getElementById('pay-btn')) {
      document.getElementById('pay-btn').addEventListener('click', function() {
        modal.style.display = 'block'
      })
    }
}

function completeorderBtnClick(e) {
  if (e.target.id === 'pay-btn') {
    modal.style.display = 'block'
  }
} 