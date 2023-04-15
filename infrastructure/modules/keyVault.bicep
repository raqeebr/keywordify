param keyVaultName string
param location string = resourceGroup().location
param tenantId string = subscription().tenantId

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

resource kv 'Microsoft.KeyVault/vaults@2021-11-01-preview' = {
  name: keyVaultName
  location: location
  properties: {
    tenantId: tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
  }
}

resource kvGoogleAdsClientId 'Microsoft.KeyVault/vaults/secrets@2021-11-01-preview' = {
  parent: kv
  name: 'AppSettings__GoogleAds__ClientId'
  properties: {
    value: googleAdsClientId
  }
}

resource kvGoogleAdsClientSecret 'Microsoft.KeyVault/vaults/secrets@2021-11-01-preview' = {
  parent: kv
  name: 'AppSettings__GoogleAds__ClientSecret'
  properties: {
    value: googleAdsClientSecret
  }
}

resource kvGoogleAdsDevToken 'Microsoft.KeyVault/vaults/secrets@2021-11-01-preview' = {
  parent: kv
  name: 'AppSettings__GoogleAds__DeveloperToken'
  properties: {
    value: googleAdsDevToken
  }
}

resource kvGoogleAdsRefreshToken 'Microsoft.KeyVault/vaults/secrets@2021-11-01-preview' = {
  parent: kv
  name: 'AppSettings__GoogleAds__RefreshToken'
  properties: {
    value: googleAdsRefreshToken
  }
}

resource kvGoogleAdsCustomerId 'Microsoft.KeyVault/vaults/secrets@2021-11-01-preview' = {
  parent: kv
  name: 'AppSettings__GoogleAds__CustomerId'
  properties: {
    value: googleAdsCustomerId
  }
}
