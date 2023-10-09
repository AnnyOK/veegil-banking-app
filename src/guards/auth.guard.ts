import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Your logic to check if the user has the required role
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming you have user data in the request

    // Check if the user has the 'admin' role (example)
    // return user;
    return true;
  }
}
