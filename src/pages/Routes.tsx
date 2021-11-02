import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import MasterLayout from '../layouts/MasterLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFound from './NotFound'
import ProductPage from './ProductPage'
import StorePage from './StorePage'

const Routes = () => {
    return <Switch>
        <Route path="/" exact>
            <Redirect to="/home" />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path={["/home", "/products", "/stores"]}>
            <MasterLayout>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/products" component={ProductPage} />
                    <Route path="/stores" component={StorePage} />
                </Switch>
            </MasterLayout>
        </Route>
        <Route path="/notfound" component={NotFound} />
        <Redirect to="/notfound" />
    </Switch>
}
export default Routes
