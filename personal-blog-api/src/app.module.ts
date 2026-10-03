import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module.js';
import { TagsModule } from './tags/tags.module.js';
import { Tag } from './tags/entities/tag.entity.js';
import { Blog } from './blogs/entities/blog.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => (
        console.log('DB_PORT from env:', ConfigService.get('DB_PORT')),
        {
        type: 'mysql',
        host: ConfigService.get('DB_HOST'),
        port: ConfigService.get('DB_PORT'),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_DATABASE'),
        entities: [Tag, Blog],
        synchronize: true
      })
    }),
    BlogsModule,
    TagsModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
