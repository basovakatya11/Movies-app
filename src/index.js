import React from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'

import App from './components/App'
import MessageFailNet from './MessageFailNet'

function NetworkStateFunction() {
  return (
    <div>
      <Online>
        <App />
      </Online>
      <Offline>
        <MessageFailNet />
      </Offline>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<NetworkStateFunction />)
