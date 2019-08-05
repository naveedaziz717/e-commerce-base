import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/header';
import HomePage from '../pages/homePage';
import ShopPage from '../pages/shopPage';
import SignInAndSignUpPage from '../pages/signInAndSignUpPage';
import { UserType } from '../utils/types';
import { auth, createUserProfileDocument } from '../firebase';
import { DocumentSnapshot, DocumentReference, User } from '../firebase/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setCurrentUser } from '../redux/user/userActions';

type PropsType = {
  setCurrentUser: (user: UserType | null) => void
}

class App extends React.Component<PropsType> {
  private unsubscribeFromAuth: any;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth: User | null) => {
      if (userAuth) {
        const userRef: DocumentReference = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snap: DocumentSnapshot) => {
          const data: any = snap.data();

          setCurrentUser({
            id: snap.id,
            displayName: data.displayName,
            email: data.email,
            createdAt: data.createdAt
          });
        });
      }
      setCurrentUser(null);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentUser: (user: UserType | null) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
