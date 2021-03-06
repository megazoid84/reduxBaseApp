import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout, getSession } from '../../modules/auth'
import Header from '../common/header'

const devTools = __DEV__ ? React.createFactory(require('../common/dev-tools').default) : () => null

class App extends Component {
  componentDidMount() {
    this.props.getSession()
  }

  render() {
    const {children, username, logout} = this.props
    return (
      <div>
        <Header title={'miApp'} username={username} logout={logout} />
        <div style={{marginTop: '1.5em'}}>{children}</div>
        {devTools()}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string,
  notifications: PropTypes.array,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    username: state.auth.session.username
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, getSession }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
