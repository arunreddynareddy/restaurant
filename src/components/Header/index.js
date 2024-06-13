import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {cartItems} = props
  const getCartCount = () => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    return count
  }

  return (
    <header className="header-container">
      <h1 className="header-main-heading">UNI Resto Cafe</h1>
      <div className="description-icon-container">
        <p className="header-description">My Orders</p>
        <div className="cart-icon-container">
          <AiOutlineShoppingCart className="cart-icon" />
          <div className="cart-count-badge">
            <p className="cart-count">{getCartCount()}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
