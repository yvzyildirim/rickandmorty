import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Characters } from './Characters'
import { Character } from './Character'
import { Provider, useSelector } from 'react-redux'
import store from './redux/store'
import { FavoriteSidebar } from './components/favorites-sidebar'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className="flex flex-col items-center justify-center">
        <Provider store={store}>
          <Router>
            <Header />
            <div className="w-full ">
              <Routes>
                <Route path="/" element={<App />} />
                <Route
                  path="/characters/:locationId?"
                  element={<Characters />}
                />
                <Route
                  path="/characters/detail/:characterId?"
                  element={<Character />}
                />
              </Routes>
            </div>
          </Router>
          <FavoriteSidebar />
        </Provider>
      </div>
    </ApolloProvider>
  </React.StrictMode>,
)

reportWebVitals()
