import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import { login } from '../actions/userActions'



function LoginScreen(location, history) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const navigate = useNavigate();


    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Inicia sesión</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='email'>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Ingresa tu correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Ingresa tu contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <br></br>
            <Button type='submit' variant='primary'> Iniciar sesión </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            ¿Eres Nuevo en Casa Artesana? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Regístrate Aquí</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen