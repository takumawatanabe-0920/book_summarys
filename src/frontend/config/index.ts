export const WebOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://sharesummary.com'
    : `${process.env.HOST}${process.env.PORT}`;
