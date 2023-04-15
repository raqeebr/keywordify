param location string = resourceGroup().location
param tenantId string = subscription().tenantId

param keyVaultName string
@secure()
param googleAdsClientId string
@secure()
param googleAdsClientSecret string
@secure()
param googleAdsDevToken string
@secure()
param googleAdsRefreshToken string
@secure()
param googleAdsCustomerId string

param staticWebAppName string

module keyvault 'modules/keyVault.bicep' = {
  name: 'keyvault'
  params: {
    keyVaultName: keyVaultName
    location: location
    tenantId: tenantId
    googleAdsClientId: googleAdsClientId
    googleAdsClientSecret: googleAdsClientSecret
    googleAdsDevToken: googleAdsDevToken
    googleAdsRefreshToken: googleAdsRefreshToken
    googleAdsCustomerId: googleAdsCustomerId
  }
}

module siteConfig 'modules/static-sites-config.bicep' = {
  name: 'staticSiteConfig'
  params: {
    staticWebAppName: staticWebAppName
  }
}
