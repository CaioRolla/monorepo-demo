import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtOrApiKeyAuthGuard extends AuthGuard(['jwt', 'api-key', 'rapid-api']) {

}
