import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import {Cabinet} from "./components/Cabinet";
import {AuthPage} from "./components/AuthPage";

export const UseRouts = isAuth => {
    if (isAuth) {
        return(
            <Switch>
                <Route path={"/cabinet"}>
                    <Cabinet />
                </Route>
                <Redirect to={"/cabinet"}/>
            </Switch>
        )
    } else{
        return(
            <Switch>
                <Route path={"/auth"}>
                    <AuthPage />
                </Route>
                <Redirect to={"/auth"}/>
            </Switch>
        )
    }
};