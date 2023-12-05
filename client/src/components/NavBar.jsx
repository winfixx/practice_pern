import { Button, Nav, Navbar, Container } from 'react-bootstrap'
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: '25px' }} to={SHOP_ROUTE}>Devshop</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            onClick={() => navigate(ADMIN_ROUTE)}
                            variant={'outline-light'}
                        >
                            Админ панель
                        </Button>
                        <Button
                            style={{ marginLeft: '6px' }}
                            variant={'outline-light'}
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;