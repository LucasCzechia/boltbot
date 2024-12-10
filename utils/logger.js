// utils/logger.js
export const logger = {
  info: (...args) => console.log(JSON.stringify({ level: 'info', message: args.join(' ') })),
  error: (...args) => console.error(JSON.stringify({ level: 'error', message: args.join(' ') })),
  debug: (...args) => console.log(JSON.stringify({ level: 'debug', message: args.join(' ') }))
};
