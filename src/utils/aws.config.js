export const getConfig = () => {
  if (process.env.REACT_APP_ENV === 'dev') {
    return {
      IdentityPoolId: 'eu-central-1:a4725ce1-f7bf-4189-a561-97e28cb3f4ea',
      UserPoolId: 'eu-central-1_a6LJbsYva',
      ClientId: '1mtiajiudt31nl6a04spp97pv2',
      baseUri: 'https://dp3t90mpu2.execute-api.eu-central-1.amazonaws.com/dev',
    }
  }

  if (process.env.REACT_APP_ENV === 'prod') {
    return {
      IdentityPoolId: 'eu-central-1:308fff16-552a-4385-b865-5008eef300af',
      UserPoolId: 'eu-central-1_ViyduVBM0',
      ClientId: '1soo8d4o0o4h2r4no130h9u7fu',
      baseUri: 'https://2egmobcwv8.execute-api.eu-central-1.amazonaws.com/prod',
    }
  }

  return {
    IdentityPoolId: 'eu-central-1:a1519340-af56-4139-8bf8-70e02b502b30',
    UserPoolId: 'eu-central-1_3B0jBlDt9',
    ClientId: '34v1r8p9eakgcknpphhic36r25',
    baseUri: 'https://clu90yd91f.execute-api.eu-central-1.amazonaws.com/local',
  }
}
