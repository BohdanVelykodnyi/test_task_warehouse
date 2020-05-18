import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import {AddKey} from "./components/AddKey";

export const UseRouts = () => {
        return(
            <Switch>
                <Route path={"/"}>
                    <AddKey />
                </Route>
                <Redirect to={"/"}/>
            </Switch>
        )

};