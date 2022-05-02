import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Provider } from 'react-redux';
import './App.css';

// vendors
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/animate/animate.css'
import './assets/vendor/css-hamburgers/hamburgers.min.css'
import './assets/vendor/animsition/css/animsition.min.css'
import './assets/vendor/select2/select2.min.css'
import './assets/vendor/daterangepicker/daterangepicker.css'
import './assets/vendor/slick/slick.css'
import './assets/vendor/MagnificPopup/magnific-popup.css'
import './assets/vendor/perfect-scrollbar/perfect-scrollbar.css'

// fonts
import './assets/fonts//font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/fonts/iconic/css/material-design-iconic-font.min.css'
import './assets/fonts/linearicons-v1.0.0/icon-font.min.css'

// main css
import './assets/css/common/main.css'
import './assets/css/common/util.css'

// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

import IndexPage from "./pages";
import UserProfile from "./pages/user/UserProfile";
import SignIn from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import {ToastContainer} from "react-toastify";
// import store from "./store";

function App() {
    return (
        // <Provider store={store}>
            <Router>
                {/*<ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}*/}
                {/*                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>*/}
                <Switch>
                    <Route exact path="/" component={IndexPage}/>

                    <Route path="/user/profile">
                        <UserProfile />
                    </Route>

                    <Route path="/login">
                        <SignIn/>
                    </Route>

                    <Route path="/user/signup">
                        <Signup/>
                    </Route>

                    <Route path="/dashboard">
                        {/*<Dashboard />*/}
                    </Route>
                </Switch>
            </Router>
        // </Provider>
    );
}

export default App;