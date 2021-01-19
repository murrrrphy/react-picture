import React, {lazy, Suspense} from 'react'
import {Loading} from './components/Loading'
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {Header} from './components/Header'
import {Footer} from './components/Footer'

const Home = lazy(() => import("./pages/Home.js"))
const About = lazy(() => import("./pages/About"))
const History = lazy(() => import("./pages/History"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/history" component={History}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </Suspense>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
