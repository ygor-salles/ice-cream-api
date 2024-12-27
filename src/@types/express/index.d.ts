declare namespace Express {
  export interface Request {
    userId: string;
    hostLifeasierOrigin?: boolean;
  }
}
