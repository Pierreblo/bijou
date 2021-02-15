import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Footer from './containers/footer';
import Faq from './containers/faq';
import Register from './containers/user/register';
import Login from './containers/user/login';
import Forgot from './containers/user/forgot';
import Logout from './containers/user/logout';
import Admin from './containers/admin/admin'
import RequireAuth from './helpers/require-auth';
import AddBijou from './containers/admin/product/addBijou';
import EditBijou from './containers/admin/product/editBijou';
import Product from './containers/products/product';
import Detail from './containers/products/detail';
import Basket from './containers/basket/basket';
import Payment from './containers/basket/payment';
import Success from './containers/basket/success';
import Profil from './containers/user/profil';
import {Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faAngleDoubleRight, faGem, faHome, faPowerOff, faShoppingBasket, faSignInAlt, faTools, faUserEdit, faUserPlus, faArrowCircleLeft, faArrowCircleRight, faBook, faSave, faTrashAlt, faCog, faPlusCircle, faCreditCard, faPaperPlane, faAddressCard } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faShoppingBasket, faAngleDoubleRight, faSignInAlt, faUserPlus, faGem, faHome, faTools, faPowerOff, faUserEdit, faFacebook , faTwitter, faYoutube, faInstagram, faArrowCircleLeft, faArrowCircleRight, faBook, faSave, faTrashAlt, faCog, faPlusCircle, faCreditCard, faPaperPlane, faAddressCard)

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={RequireAuth(Home)} />
        <Route exact path="/faq" component={RequireAuth(Faq)} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/product" component={RequireAuth(Product)} />
        <Route exact path="/detail/:id" component={RequireAuth(Detail)} />
        <Route exact path="/basket" component={RequireAuth(Basket)} />
        <Route exact path="/success" component={RequireAuth(Success)} />
        <Route exact path="/profil" component={RequireAuth(Profil, true)} />
        <Route exact path="/payment/:orderId" component={RequireAuth(Payment, true)} />
        <Route exact path="/admin" component={RequireAuth(Admin, true)} />
        <Route exact path="/admin/addBijou" component={RequireAuth(AddBijou, true)} />
        <Route exact path="/admin/edit/:id" component={RequireAuth(EditBijou, true)} />
        <Route exact path="/forgot" component={Forgot} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;