import {
  Signup,
  Dashboard,
  Login,
  PrivateRoute,
  ForgotPassword,
  UpdateProfile,
} from './components';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <AuthProvider>
      <Container
        className='d-flex align-items-center justify-content-center flex-dir-col'
        style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/forgot-password' component={ForgotPassword} />
              <Route path='/login' component={Login} />

              <Signup />
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
