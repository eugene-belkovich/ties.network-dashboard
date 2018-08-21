import React from 'react'
import { Grid, IconButton } from 'material-ui'
import 'font-awesome/css/font-awesome.min.css'
import './social.styles.css'

export const SOCIAL_LINKS = [
  { icon: 'fa-linkedin-square', href: 'https://www.linkedin.com/company-beta/18035770/' },
  {
    icon: 'fa-slack',
    href: 'https://join.slack.com/tiesnetwork/shared_invite/MTk4OTI3ODc4OTE0LTE0OTc2MjAxNDgtM2NiMDU5ZmZkOA',
  },
  { icon: 'fa-telegram', href: 'https://t.me/tiesnetwork' },
  { icon: 'fa-facebook-square', href: 'https://www.facebook.com/tiesdb' },
  { icon: 'fa-github-square', href: 'http://github.com/tiesnetwork' },
  { icon: 'fa-twitter-square', href: 'https://twitter.com/tiesnetwork' },
]

export function SocialLinks() {
  return (
    <Grid container className="social-link-container" justify="center" spacing={0}>
      {SOCIAL_LINKS.map(({ icon, href }) =>
        (<IconButton key={href}>
          <a target="_blank" className="social-link" rel="noopener noreferrer" href={href}>
            <i className={`fa ${icon}`} />
          </a>
        </IconButton>),
      )}
    </Grid>)
}

