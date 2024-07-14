import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MagicMoverModule } from './models/magic-movers/magic-mover.module';
import { MagicItemModule } from './models/magic-items/magic-item.module';
import { MissionModule } from './models/missions/mission.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './common/logging/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    DatabaseModule,
    MagicMoverModule,
    MagicItemModule,
    MissionModule,
  ],
})
export class AppModule {}
