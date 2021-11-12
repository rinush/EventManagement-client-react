import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import home from "./components/home";
import EventDetails from "./components/event-details/event-details";
import AdminDashBoard from "./components/admin/admin-dashboard";
import LogIn from "./components/login/login";
import SignUp from "./components/signUp/signup";
import Profile from './components/profile/profile'
import SearchResults from "./components/searchResults";
import Basic from "./components/signUp/formikSignUp";

function App() {

  return (
      <>
        <BrowserRouter>
            <Route path={[
                "/",
                "/user/:username"
            ]}
                   exact={true}
                   component={home}/>
          <Route path="/event/:eventId" exact={true} component={EventDetails}/>
          <Route path="/admin"  component={AdminDashBoard}/>
          <Route path="/search" component={SearchResults}/>
          <Route path="/login" exact={true} component={LogIn}/>
          <Route path="/signup" exact={true} component={SignUp}/>
            <Route path="/formik" exact={true} component={Basic}/>
            <Route
                path={[
                    "/profile",
                    "/profile/:uid",
                ]}
                exact={true} component={Profile}/>
        </BrowserRouter>
      </>
  );
}

export default App;
