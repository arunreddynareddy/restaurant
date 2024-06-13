import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import DishItem from '../DishItem'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = dish => {
    const isDishPresent = cartItems.find(
      eachDish => eachDish.dishId === dish.dishId,
    )

    if (!isDishPresent) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isDishExists = cartItems.find(
      eachItem => eachItem.dishId === dish.dishId,
    )

    if (isDishExists) {
      setCartItems(prev =>
        prev
          .map(eachDish =>
            eachDish.dishId === dish.dishId
              ? {...eachDish, quantity: eachDish.quantity - 1}
              : eachDish,
          )
          .filter(eachDish => eachDish.quantity > 0),
      )
    }
  }

  const getFormattedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishId: eachDish.dish_id,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        addonCat: eachDish.addonCat,
      })),
    }))

  const getFetchedData = async () => {
    const url = 'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
    const apiResponse = await fetch(url)
    const data = await apiResponse.json()
    console.log(data)
    const updatedData = getFormattedData(data[0].table_menu_list)
    setResponse(updatedData)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    getFetchedData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onUpdateActiveCategoryId = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderMenuCategoryView = () =>
    response.map(eachCategory => {
      const onClickCategory = () =>
        onUpdateActiveCategoryId(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickCategory}
        >
          <button type="button" className="menu-tab-button">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderLoaderSpinner = () => (
    <div className="loader-spinner">
      <Loader type="ThreeDots" color="#000000" height="50" weight="50" />
    </div>
  )

  return isLoading ? (
    renderLoaderSpinner()
  ) : (
    <div className="home-container">
      <Header cartItems={cartItems} />
      <ul className="menu-list-container">{renderMenuCategoryView()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
