import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://e21c85c5081ba0a7fdfc677df1344219@o4509771605213184.ingest.de.sentry.io/4509771827839056",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
