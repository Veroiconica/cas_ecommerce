import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen({match, history}) {
    const productId = useParams()

    const location = useLocation()
    const navigate = useNavigate()

  
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1 
    const [searchParms] = useSearchParams()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    console.log('cartItems:', cartItems)

    useEffect(() => {
      if(productId.id){
          dispatch(addToCart(productId.id, qty))
      }
    }, [dispatch, productId.id, qty])

    const removeFromCartHandler = (id) => {
      
        dispatch(removeFromCart(id))
    }
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const checkoutHandler = () => {
      if (!userInfo) {
      navigate('/login')
      } else {
        navigate('/shipping')
      }
    }

  return (
    <Row>
      <Col md={8}>
          <h1>Carrito de compras</h1>
          { cartItems.length === 0 ? (
            <Message variant='info'>
              Tu carrito está vacío <Link to='/'> Regresar al sitio de compras </Link>
            </Message>
          ):(
            <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>
                          ${item.price}
                        </Col>
                        <Col md={3}>
                        <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>
                                  {x+1}
                              </option>

                            ))

                          }

                        </Form.Control>
                        </Col>
                        <Col md={1}>
                          <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                              <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                  </ListGroup.Item>
                ))}

            </ListGroup>
          )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) productos</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroupItem>
          </ListGroup>

          <ListGroupItem>
            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>

              Continua con la compra

            </Button>
          </ListGroupItem>
        </Card>
      </Col>


    </Row>
  )
}

export default CartScreen