param staticWebAppName string

resource symbolicname 'Microsoft.Web/staticSites/config@2022-03-01' = {
  name: '${staticWebAppName}/appsettings'
  kind: 'string'
  properties: {
    GOOGLE_ADS_CLIENT_ID: '@Microsoft.KeyVault(SecretUri=AppSettings__GoogleAds__ClientId)'
    GOOGLE_ADS_CLIENT_SECRET: '@Microsoft.KeyVault(SecretUri=AppSettings__GoogleAds__ClientSecret)'
    GOOGLE_ADS_DEVELOPER_TOKEN: '@Microsoft.KeyVault(SecretUri=AppSettings__GoogleAds__DeveloperToken)'
    GOOGLE_ADS_REFRESH_TOKEN: '@Microsoft.KeyVault(SecretUri=AppSettings__GoogleAds__RefreshToken)'
    GOOGLE_ADS_CUSTOMER_ID: '@Microsoft.KeyVault(SecretUri=AppSettings__GoogleAds__CustomerId)'
  }
}
