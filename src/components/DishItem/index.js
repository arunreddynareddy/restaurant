import './index.css'

const CartItem = props => {
  const {cartItems, dishDetails, addItemToCart, removeItemFromCart} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishType,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    dishAvailability,
    addonCat,
  } = dishDetails

  const onIncrementQuantity = () => addItemToCart(dishDetails)
  const onDecrementQuantity = () => removeItemFromCart(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    const quantity = cartItem ? cartItem.quantity : 0
    return quantity
  }

  const renderControllerButtons = () => (
    <div className="controller-container">
      <button type="button" className="button" onClick={onDecrementQuantity}>
        -
      </button>
      <p className="quantity">{getQuantity()}</p>
      <button type="button" className="button" onClick={onIncrementQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="dish-item-container">
      <div className="veg-details-container">
        <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
          <div
            className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`}
          />
        </div>
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-currency-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability && renderControllerButtons()}
          {!dishAvailability && (
            <p className="not-available-text">Not Available</p>
          )}
          {addonCat.length !== 0 && (
            <p className="addon-available-text">Customizations Available</p>
          )}
        </div>
      </div>
      <p className="dish-calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default CartItem
