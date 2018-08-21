export const styles = {
  wrapper: {
    margin: '10px 0',
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
  closedCard: {
    backgroundColor: 'white',
    height: 80,
  },
  card: {
    maxWidth: 'calc(100% - 32px)',
    padding: 16,
    backgroundColor: 'white',
  },
  cardBigTitle: {
    fontFamily: 'Moderat_ss02-Bold',
    fontSize: 24,
    marginBottom: 15,
  },
  cardTitle: {
    marginBottom: 15,
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
  },
  walletInfo: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    marginBottom: 10,
  },
  address: {
    width: 390,
    marginRight: 20,
    maxWidth: '100%',
    wordBreak: 'break-all',
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    margin: '2px 0 10px 0',
  },
  underline: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  sendEthAddress: {
    padding: 20,
    border: '1px solid',
    maxWidth: 390,
    wordBreak: 'break-all',
    margin: '20px 0',
    textAlign: 'center',
  },
  calloutText: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    lineHeight: '24px',
  },
  ethereumInfoBlock: {
    maxWidth: 700,
  },
  cardFooter: {
    padding: '20px 16px 4px 16px',
    margin: '0 -16px',
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.87)',
    wordWrap: 'break-word',
  },
  footerLink: {
    marginLeft: 5,
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  tabRoot: {
    maxWidth: 'none',
  },
  error: {
    marginTop: 10,
  },
  btcExpireTime: {
    color: '#174DA1',
    fontSize: '12px',
  },
  instruction: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 20,
    marginTop: 23,
    marginBottom: 23,
    '& a': {
      '&:link, &:visited': {
        color: '#000000',
        textDecoration: 'none',
      },
      '&:hover': {
        color: '#174da1',
        textDecoration: 'none',
      },
    },
  },
}
