import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupUserMutation } from '../services/appApi'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'

function SignUp() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [signupUser, { isLoading, error }] = useSignupUserMutation()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    signupUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    }).then(({ data }) => {
      if (data) {
        navigate('/chat')
      }
    })
  }

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSubmit}>
            <h1 className="text-center">Create account</h1>
            {error && <p className="alert alert-danger">{error.data}</p>}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={handleChange}
                value={newUser.name}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={newUser.email}
                name="email"
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
                value={newUser.password}
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? 'Signing you up...' : 'Signup'}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  )
}

export default SignUp
