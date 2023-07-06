import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen({history}) {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()


    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0 ).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 150000 ? 0 : 10500).toFixed(2)
    cart.taxPrice = Number((0.19) * cart.itemsPrice).toFixed(2)
    
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

   

    useEffect(() => {

      if(!cart.paymentMethod){
        navigate('/payment')
      }

      if(success){
        navigate(`/order/${order._id}`)
      }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
          orderItems:cart.cartItems,
          shippingAddress:cart.shippingAddress,
          paymentMethod:cart.paymentMethod,
          itemsPrice:cart.itemsPrice,
          shippingPrice:cart.shippingPrice,
          taxPrice:cart.taxPrice,
          totalPrice:cart.totalPrice,
        }))
    }
    
    
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Envío</h2>

                <p>
                  <strong>Dirección de envío: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city} -
                  {'   '}
                  {cart.shippingAddress.postalCode},
                  {'   '}
                  {cart.shippingAddress.country}.
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Método de pago</h2>

                <p>
                  <strong>Método de pago seleccionado: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Confirmar pedido</h2>
                {cart.cartItems.length === 0 ? <Message variant='info'>
                  Tu carrito está vacío
                </Message> : (
                  <ListGroup variant='flush'>
                      {cart.cartItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                              <Row>
                                <Col md={1}>
                                  <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>

                                <Col>
                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>

                                <Col md={4}>
                                  {item.qty} x $ {item.price} = $ {(item.qty * item.price).toFixed(2)}
                                </Col>

                              </Row>
                          </ListGroup.Item>
                      ))}
                  </ListGroup>
                )}
              </ListGroup.Item>

            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                        <h2>Resumen de tu pedido</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                        <Row>
                          <Col>Artículo: </Col>
                          <Col>${ cart.itemsPrice }</Col>
                        </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                        <Row>
                          <Col>Envío: </Col>
                          <Col>${ cart.shippingPrice }</Col>
                        </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                        <Row>
                          <Col>Impuesto (IVA): </Col>
                          <Col>${ cart.taxPrice }</Col>
                        </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                        <Row>
                          <Col>Total: </Col>
                          <Col>${ cart.totalPrice }</Col>
                        </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button 
                      type='button' 
                      className='btn-block' 
                      disabled={cart.cartItems === 0} 
                      onClick={placeOrder}
                    >
                      Realizar Pedido
                    </Button>
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen