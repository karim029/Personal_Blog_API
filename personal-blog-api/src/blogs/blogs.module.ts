import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service.js';
import { BlogsController } from './blogs.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity.js';
import { Tag } from '../tags/entities/tag.entity.js';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [TypeOrmModule.forFeature([Tag, Blog])]
})
export class BlogsModule {}
