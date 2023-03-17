import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from '../services/appApi'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/appContext'
import { Col, Container, Form, Row, Button, Spinner } from 'react-bootstrap'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loginUser, { isLoading, error }] = useLoginUserMutation()
  const navigate = useNavigate()
  const { socket } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    loginUser({
      email: user.email,
      password: user.password,
    }).then(({ data }) => {
      if (data) {
        socket.emit('new-user')
        navigate('/chat')
      }
    })
  }

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {error && <p className="alert alert-danger">{error.data}</p>}
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={user.email}
                name="email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
                name="password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? <Spinner animation="grow" /> : 'Login'}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account ? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
