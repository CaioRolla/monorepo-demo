import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RapidAPIAuthGuard extends AuthGuard('rapid-api') {}