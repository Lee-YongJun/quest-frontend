//리액트 훅
import React from "react";
//부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
//리액트돔
//Router가 아닌 BrowserRouter사용이유는 Router는 버튼클릭시 router에 해당하는component를 가져오지 못해 사용.
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
//nav바
import NavList from "./components/NavList";
//라우터
import routes from "./routes";

const App = () => {
    return (
        <Router>
            <NavList/>
            <div className="container mt-3">
                <Switch>
                    {
                        routes.map(route => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact
                                >
                                    <route.component/>
                                </Route>
                            )
                        })
                    };
                </Switch>
            </div>
        </Router>
    );
};
export default App;
