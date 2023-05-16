# Keywordify

Simplify your SEO strategy with Keywordify - the app that extracts the best keywords for your content.

![Screenshot of Keywordify](/public/demo.gif)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Technologies](#technologies)
- [License](#license)

## Features

- Get suggestions based on user input
- Visualize keyword stats with Chart.js

## Installation

To install Keywordify, clone this repository and install dependencies:

```bash
git clone https://github.com/username/keywordify.git
cd keywordify
npm ci
```

Then create a .env.local file and provide the necessary credentials (found in .env).

## Usage
To start the app in development mode, run:

```bash
npm run dev
```
This will start the Next.js development server and the API server.

The app then can be accessed at https://localhost:3000

## Configuration

### Prerequisuites:
1. Google Ads Account
2. Azure Account with a valid Azure Subscription

### Setting up your Google Ads Account

Since the app relies on Google Ads api, you'll need to setup a Google Ads account and include the necessary configs in your `env.local` file

To setup a Google Ads Test Account follow this <a href="https://developers.google.com/google-ads/api/docs/first-call/test-accounts" target="_blank">documentation</a>

Once your Google Ads account is created, you will need to obtain a developer token. Follow this <a href="https://developers.google.com/google-ads/api/docs/first-call/dev-token" target="_blank">guide</a> to obtain one

### Setting up Azure Services

The app requires 2 Azure services, <a href="https://azure.microsoft.com/en-us/products/app-service/static" target="_blank">Azure Static Webapps</a> and <a href="https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/overview" target="_blank">Azure Cognitive Services for Language</a>

To build & deploy the Next.js app into Azure Static Web Apps follow this <a href="https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid" target="_blank">guide</a>

To setup Azure Cognitive Services for Language follow this <a href="https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/key-phrase-extraction/quickstart?pivots=programming-language-javascript" target="_blank">guide</a> 

Once you've setup it up, update the `.env.local` file with the endpoint and api key


<h3><i>That's it! You're all set! 🚀</i></h3>

## Technologies

Keywordify was built with the following technologies:
* ![next-url][next.js]
* ![typescript-url][typescript]
* ![swr-url][swr]
* ![google-ads-api-url][google-ads-api]
* ![chart.js-url][chart.js]
* ![react-chartjs-2-url][react-chartjs-2]

## License
This project is licensed under the MIT License - see the LICENSE file for details.

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs
[next-url]: https://nextjs.org/
[swr]: https://img.shields.io/badge/swr-000000?style=for-the-badge&logo=swc
[swr-url]: https://swr.vercel.app/
[picocss]: https://img.shields.io/badge/picocss-000000?style=for-the-badge&logo=picocss
[picocss-url]: https://picocss.com/
[typescript]: https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript
[typescript-url]: https://www.typescriptlang.org/
[google-ads-api]: https://img.shields.io/badge/google_ads_api-000000?style=for-the-badge&logo=googleads
[google-ads-api-url]: https://developers.google.com/google-ads/api/docs/start
[chart.js]: https://img.shields.io/badge/chart.js-000000?style=for-the-badge&logo=chartdotjs
[chart.js-url]: https://www.chartjs.org/
[react-chartjs-2]: https://img.shields.io/badge/react_chart.js_2-000000?style=for-the-badge&logo=react
[react-chartjs-2-url]: https://react-chartjs-2.js.org/
