import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { ApiExcludeEndpoint, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({
  path: "health",
  version: '1'
})
export class HealthController {
  constructor(
    private readonly _health: HealthCheckService,
    private readonly _db: TypeOrmHealthIndicator
  ) {}

  @Get('ok')
  @ApiOkResponse({ description: `OK` })
  public async ok() {
    return 'OK';
  }

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint()
  public async check() {
    return this._health.check([
      () => this._db.pingCheck('database')
    ]);
  }
}
