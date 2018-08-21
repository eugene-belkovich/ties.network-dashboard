import React from 'react'
import { Grid, Button } from 'material-ui'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { PageWithNavbar, Callout, InvitesTable } from '../../components'
import { classesPropTypes, userPropTypes } from '../../prop-types'
import { invitesSelector } from './invites.selector'

const styles = {
  wrapper: {
    maxWidth: 1500,
    padding: 20,
  },
  text: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
  },
  titleName: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 24,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Moderat_ss02-Bold',
    paddingLeft: 5,
    fontSize: 24,
  },
  calloutText: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    lineHeight: '24px',
  },
  callout: {
    marginTop: 24,
  },
  card: {
    marginTop: 10,
    maxWidth: 'calc(100% - 32px)',
    padding: 16,
    backgroundColor: 'white',
  },
  copyButton: {
    margin: '20px 0 0 20px',
  },
  refLink: {
    margin: '20px 0 0 10px',
    border: '1px solid black',
    textAlign: 'center',
    padding: 20,
  },
  invitesCard: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  '@media (max-width: 599.5px )': {
    refLink: {
      fontSize: 14,
    },
  },
}

@connect(invitesSelector)
@injectSheet(styles)
export class InvitesScreen extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    user: userPropTypes,
  }

  onCopyClick = () => {
    this.selectText('referralLink')
    try {
      document.execCommand('copy')
    } catch (err) {
      console.log('Oops, unable to copy')
    }
    window.getSelection().removeAllRanges()
  }

  selectText = (containerId) => {
    if (document.selection) {
      const range = document.body.createTextRange()
      range.moveToElementText(document.getElementById(containerId))
      range.select()
    } else if (window.getSelection) {
      const range = document.createRange()
      range.selectNode(document.getElementById(containerId))
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  }

  render() {
    const { classes, user } = this.props
    const cognitoUserId = user.cognitoUser.username

    return (
      <PageWithNavbar>
        <Grid container className={classes.wrapper} direction="column" spacing={0}>
          <Grid item className={classes.titleName}>
            <span className={classes.titleText}>
              Ties.Network referral program
          </span>
          </Grid>
          <Grid className={classes.card}>
            <div className={classes.text}>
              Here is your referral link. Share it to your social networks and get up to 2% bonuses
              from the tokens purchased during TGE via your link.
              You will receive your reward tokens one month after TGE ends.
            </div>
            <Callout title="ATTENTION!" color="#174DA1" className={classes.callout}>
              <div className={classes.calloutText}>
                The bonuses will be allocated to the address inserted and you will not be able to
                change it in the future! DO NOT USE your cryptoexchange ETH wallet address or ETH
                address created with Ethereum client with no access to private key. Use your own ETH
                wallet address only!
              </div>
            </Callout>
            <Grid container direction="column" spacing={0}>
              {cognitoUserId &&
              <Grid container className={classes.text} align="center">
                <span className={classes.refLink} id="referralLink">
                  {`https://dashboard.ties.network?from=${cognitoUserId}`}
                </span>
                <Button
                  raised
                  color="primary"
                  className={classes.copyButton}
                  onClick={() => this.onCopyClick()}
                >
                  Copy Link
                </Button>
              </Grid>
              }
            </Grid>
          </Grid>
          <Grid className={classes.invitesCard}>
            <InvitesTable />
          </Grid>
        </Grid>
      </PageWithNavbar>
    )
  }
}
