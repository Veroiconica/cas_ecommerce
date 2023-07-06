import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')

    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Envíos</h1>
        <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Dirección de envío</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingresa tu dirección'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ciudad/Departamento</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingresa tu ciudad/departamento'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Código Postal</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingresa tu código postal'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingresa tu país'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <br/>

                <Button type='submit' variant='primary'>
                    Continuar
                </Button>



        </Form>
    </FormContainer>
  )
}

export default ShippingScreen