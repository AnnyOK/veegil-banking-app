// src/common/middleware/auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from './custom.request.interface';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('no auth header');
      return;
    }
    // console.log(req, 'auth header');
    if (authHeader) {
      console.log('middlewaren call');

      const token = authHeader.replace('Bearer ', '');
      // console.log(token, 'tokened ');
      try {
        const decoded = await this.jwtService.verifyToken(token);
        // console.log(decoded, 'decoded');
        req.user = decoded; // Attach user data to the request
      } catch (error) {
        // console.log(error, 'from catch ');
        // Handle token validation errors
        // For example, return a 401 Unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    }

    next();
  }
}
