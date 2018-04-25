import './style.scss'

import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

class App extends Component {
  state = {
    projects: [ ]
  }

  async componentDidMount() {
    try {
      const resp = await fetch('/api/projects')
      const projects = await resp.json()
      this.setState({ projects })
    } catch (e) {
      console.log('Error while fetch projects')
      throw e
    }
  }
  
  render() {
    return (
      <Fragment>
        <h1>Hello, React!</h1>
        <ul>
          { this.state.projects.map(p => <li key={p.id}>{ p.projectName }</li>) }
        </ul>
      </Fragment>
    )
  }
}

const HMRApp = hot(module)(App)

document.addEventListener('DOMContentLoaded', () => {
  render(<HMRApp/>, document.querySelector('main'))
})
