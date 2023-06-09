import { Nav, Navbar, Container, Button, NavDropdown } from 'react-bootstrap'
import { useLogoutUserMutation } from '../services/appApi'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

function NavigationBar() {
  const user = useSelector((state) => state.user)
  const [logout, { isLoading, error }] = useLogoutUserMutation()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout(user)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user && (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
