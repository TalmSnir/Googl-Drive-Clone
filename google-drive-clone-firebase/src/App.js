import {
  Signup,
  Profile,
  Login,
  PrivateRoute,
  ForgotPassword,
  UpdateProfile,
} from './components';
import { Dashboard } from './components/google-drive';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/folder/:folderId' component={Dashboard} />

          <PrivateRoute path='/user' component={Profile} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />
          <Route path='/signup' component={Signup} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/login' component={Login} />

          <Signup />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
