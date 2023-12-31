import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Checks APIs health to show the api is running.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The aplication is running',
  })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
