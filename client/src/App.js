import './App.scss'
import './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import {
  Home,
  Activity,
  CreateEvent,
  GetEvent,
  UpdateEvent,
  CreateProperty,
  CreateUser,
  LoginUser,
  Chat,
  Messages,
  GetProperty,
  NoLocation,
  UpdateProperty,
  Favorites,
  GetReservationList,
  GetReservation,
  Events,
  Properties,
  PasswordReset,
  PasswordResetLink,
  Profile,
} from './pages'
import GetCustomerReservationList from './pages/CustomerReservations/GetCustomerReservationList'
import GetCustomerReservation from './pages/CustomerReservations/GetCustomerReservation'

function App() {
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_TEST_NEW
  )

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <div className="App">
          <Route exact path="/" component={Home} />

          <Route path="/register" component={CreateUser} />
          <Route path="/login" component={LoginUser} />
          <Route path="/profile" component={Profile} />
          <Route path="/password-reset-link" component={PasswordResetLink} />
          <Route path="/reset/:token" component={PasswordReset} />

          <Route path="/no-location" component={NoLocation} />

          <Route path="/activity" component={Activity} />
          <Route path="/favorites" component={Favorites} />

          <Route path="/events" component={Events} />
          <Route path="/event/:id" component={GetEvent} />
          <Route path="/update-event/:id" component={UpdateEvent} />
          <Route path="/create-event" component={CreateEvent} />

          <Route path="/properties" component={Properties} />
          <Route path="/create-property" component={CreateProperty} />
          <Route path="/update-property/:id" component={UpdateProperty} />
          <Route path="/property/:id/:author_id" component={GetProperty} />

          <Route path="/reservations" component={GetReservationList} />
          <Route
            path="/reservation/:reservation_id/:property_id"
            component={GetReservation}
          />

          <Route
            path="/customer-reservations"
            component={GetCustomerReservationList}
          />
          <Route
            path="/customer-reservation/:reservation_id/:property_id"
            component={GetCustomerReservation}
          />

          <Route
            path="/chat/:recepient_id/:recepient/:conversation_id"
            component={Chat}
          />
          <Route path="/messages/" component={Messages} />
        </div>
      </Elements>
    </Router>
  )
}

export default App
