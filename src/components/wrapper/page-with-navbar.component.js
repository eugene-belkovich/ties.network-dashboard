import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Drawer, Grid, IconButton, Button } from 'material-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { includes } from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { childrenPropTypes, routerPropTypes, userPropTypes } from './../../prop-types'
import { signOut } from './../../actions'
import tiesLogo from '../../public/image/ties-logo.png'
import { pageWithNavbarSelector } from './page-with-navbar.selector'
import './page-with-navbar.styles.css'

@connect(pageWithNavbarSelector)
export class PageWithNavbar extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: childrenPropTypes.isRequired,
    router: routerPropTypes.isRequired,
    user: userPropTypes.isRequired,
  }

  constructor(props) {
    super(props)
    this.mql = window.matchMedia('(min-width: 1280px)')
    this.mql.addListener(this.handleMediaQueryChanged)
  }

  state = { open: false, docked: true }

  componentDidMount() {
    this.handleMediaQueryChanged()
  }

  componentWillUnmount() {
    if (this.mql) {
      this.mql.removeListener(this.handleMediaQueryChanged)
    }
  }

  getLinks = () => {
    const { isLoggedIn, isAdmin } = this.props.user
    const links = [
      { to: '/', title: 'Contribute', show: isLoggedIn },
      { to: '/invites', title: 'Invites', show: isLoggedIn },
      { to: '/faq', title: 'Deposit FAQ', show: isLoggedIn },
      { to: '/settings', title: 'Settings', show: isLoggedIn },
      { to: '/', altTo: ['/login'], title: 'Sign In', show: !isLoggedIn },
      { to: '/signup', title: 'Sign Up', show: !isLoggedIn },
      { to: '/admin', title: 'Admin', show: isAdmin },
      { url: 'https://ties.network/', title: 'Ties.network', show: true },
      { title: 'Logout', show: isLoggedIn, onClick: this.logout },
    ].filter(link => link.show)


    return links.map((link) => {
      if (link.to) {
        return (
          <Link key={link.title} to={link.to}>
            <div className={`menu-link ${this.isActive(link) ? 'active' : ''}`}>{link.title}</div>
          </Link>
        )
      }
      if (link.url) {
        return (
          <a key={link.title} href="https://ties.network/">
            <div className={`menu-link ${this.isActive(link) ? 'active' : ''}`}>{link.title}</div>
          </a>
        )
      }
      return (
        <div
          key={link.title}
          tabIndex={0}
          role="button"
          className="menu-link"
          onClick={link.onClick}
        >
          {link.title}
        </div>
      )
    })
  }

  handleMediaQueryChanged = () => {
    const { matches } = this.mql
    this.setState({ open: matches, docked: matches })
  }

  isActive = (link) => {
    const { router: { location: { pathname } } } = this.props
    const { to, altTo } = link
    return to === pathname || includes(altTo, pathname)
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })
  logout = () => this.props.dispatch(signOut())

  render() {
    const { children } = this.props
    const { open, docked } = this.state

    return (
      <div>
        <AppBar className="app-bar" color="default" position="static">
          <Toolbar className="app-toolbar">
            <Grid container align="center" xs item spacing={0}>
              <Link to="/" className="header-logo-container">
                <IconButton> <img src={tiesLogo} alt="" className="header-logo" /></IconButton>
              </Link>
              <Grid className="tiesnetwork">
                ties<span className="text-style-2">.</span>network
              </Grid>
              <Grid item xs />
              <Grid item xs hidden={{ lgUp: true }} container justify="flex-end" className="menu-button-container">
                <Button className="menu-button" onClick={this.handleOpen}>menu</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <CSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div className="drawer-content">
            {children}
          </div>
        </CSSTransitionGroup>

        <Drawer
          anchor="left"
          classes={{ paper: 'drawer-paper' }}
          type={docked ? 'persistent' : 'temporary'}
          open={open}
          onRequestClose={this.handleClose}
        >
          <Grid item xs container direction="column" spacing={0}>
            <Grid className="menu-content" container direction="column" spacing={0}>
              {this.getLinks()}
            </Grid>
          </Grid>
        </Drawer>
      </div>
    )
  }
}
