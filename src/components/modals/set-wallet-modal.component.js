import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Button } from 'material-ui'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { classesPropTypes } from '../../prop-types'

const styles = () => ({
  title: {
    '& h2': {
      fontFamily: 'AvenirNextLTPro-Demi !important',
      color: 'black',
    },
  },
  text: {
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro  !important',
    color: 'black',
  },
  ethAddress: {
    marginTop: 20,
    wordBreak: 'break-all',
    border: '1px solid black',
    textAlign: 'center',
    padding: 20,
  },
})

@withStyles(styles)
export class SetWalletModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    classes: classesPropTypes.isRequired,
    ethAddress: PropTypes.string,
  }

  render() {
    const { isOpen, onCancel, onSubmit, ethAddress, classes } = this.props
    return (
      <Dialog open={isOpen} onRequestClose={onCancel}>
        <DialogTitle className={classes.title}>Check your address</DialogTitle>
        <DialogContent>
          <div className={classes.text}>
            You will not able to change your ETH address in future. This action is permanent.
            Please make sure that you want to use this address:
            <div className={classes.ethAddress}>{ethAddress}</div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button raised onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
