import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto.js';
import { UpdateBlogDto } from './dto/update-blog.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity.js';
import { Repository } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity.js';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(Tag) 
    private tagRepository: Repository<Tag>,
  ){}

  async createBlog(createBlogDto: CreateBlogDto) {
    const tags: Tag[] = []
    for (const element of createBlogDto.tags) {
      const found = await this.tagRepository.findOne({where: {name: element}})
      if(found){
        tags.push(found)
      }else{
        const newTag =  this.tagRepository.create({name: element})
       console.log(`new tag created: ${newTag}`)
       await this.tagRepository.save(newTag)
       tags.push(newTag)
      }
    }
    const newBlog = {
      title: createBlogDto.title,
      content: createBlogDto.content,
      category: createBlogDto.category,
      tags: tags
    }
    
    const blog = await this.blogRepository.save(newBlog)
    console.log(`New blog created: ${blog}`)
    return blog
  }

  async findAllBlogs() {
    return await this.blogRepository.find({relations: {tags: true}})
  }

  async findOneBlog(id: number) {
    const blog = await this.blogRepository.findOne({where: {id: id}, relations: {tags: true}})
    if(!blog){
      throw new NotFoundException('No Blog found!')
    }
    return blog
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto) {
    
    const blog = await this.findOneBlog(id)
    if(updateBlogDto.title !== undefined) {blog.title = updateBlogDto.title}
    if(updateBlogDto.content !== undefined) {blog.content = updateBlogDto.content}
    if(updateBlogDto.category !== undefined) {blog.category = updateBlogDto.category}
    
    if(updateBlogDto.tags !== undefined){
      const tags: Tag[] = []
      for(const element of updateBlogDto.tags){
        const found = await this.tagRepository.findOneBy({name: element})
        if(found){
          tags.push(found)
        }else{
          const newTag =  this.tagRepository.create({name: element})
          console.log(`new tag created: ${newTag}`)
          await this.tagRepository.save(newTag)
          tags.push(newTag)
      }
      }
      blog.tags = tags
    }
    await this.blogRepository.save(blog)
    return blog
  }

  async removeBlog(id: number) {
    const blog = await this.findOneBlog(id)
    return await this.blogRepository.remove(blog)
  }
}
