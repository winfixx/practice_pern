import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Shop from '../pages/Shop';

const AppRouter = observer(() => {
    const { user } = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            <Route path={'*'} element={<Shop />} />
        </Routes>
    );
});

export default AppRouter;