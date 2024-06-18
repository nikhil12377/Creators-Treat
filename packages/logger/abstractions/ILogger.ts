export default interface ILogger {
  log(message: string): void;
  error(message: Error, data?: any): void;
}
