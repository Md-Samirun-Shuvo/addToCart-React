import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetch('product.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  useEffect(() => {
    let total = 0;
    let quantity = 0;
    const newCart = cart;
    newCart.forEach(cart_item => {
      total += cart_item.price * cart_item.quantity;
      quantity += cart_item.quantity;
    });

    setTotalAmount(total);
    setQuantity(quantity);
  }, [cart])


  const addToCart = (product) => {
    if (!cart.find(cart_item => cart_item.id === product.id)) {
      product.quantity = 1;
      const newCart = [...cart, product];
      setCart(newCart);
    }
    else {
      // product.quantity = 1;
      const newCart = cart;
      newCart.forEach(cart_item => {
        if (cart_item.id === product.id) {
          cart_item.quantity += 1;
        }
      })
      const newCartAppend = [...newCart];
      setCart(newCartAppend);
    }
  }

  const deleteProduct = (product) => {
    const cartItems = cart;
    const cartItemsFilters = cartItems.filter(cart_item => cart_item.id !== product.id);
    setCart(cartItemsFilters);
  }


  console.log(cart);

  // console.log(products);

  return (
    <div className="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <div className='row row-cols-1 row-cols-md-4 g-4'>
              {
                products?.map(product => <div
                  className='col'
                  key={product.id}
                >
                  <div class="card h-100">
                    <img src={product.img} class="card-img-top" alt="..." />
                    <div class="card-body text-center">
                      <h5 class="card-title">{product.name}</h5>
                      <p class="card-text">${product.price}</p>
                    </div>
                    <div className="card-footer text-center">
                      <button onClick={() => addToCart(product)} className='btn btn-dark px-4'>Add to Cart</button>
                    </div>
                  </div>
                </div>)
              }
            </div>

          </div>
          <div className="col-4 cart">
            <p>Total Cart Items: {quantity}</p>
            {
              cart?.map(cart => <div>
                <div className="row">
                  <div className="col-3">
                    <img className='img-fluid' src={cart.product_thambnail} alt="" srcset="" />
                  </div>
                  <div className="col-7">
                    <p className='mb-0'>{cart.meta_title}</p>
                    <p className='mb-0'>${cart.price} x {cart.quantity} = ${cart.price * cart.quantity}</p>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <button onClick={() => deleteProduct(cart)} className='btn btn-danger'>Del</button>
                  </div>
                </div>
              </div>)
            }

            <div className='mt-5'>
              <p>Total Amount: {totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
