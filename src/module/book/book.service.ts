import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';
@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async create(data: BookDTO) {
    const bookExist = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });
    if (bookExist) {
      throw new Error('Book Exist');
    }
    const book = await this.prisma.book.create({
      data,
    });
    return book;
  }
  async getAll() {
    return await this.prisma.book.findMany();
  }
  async update(id: string, data: BookDTO) {
    const bookExist = await this.prisma.book.findFirst({
      where: {
        bar_code: id,
      },
    });
    if (!bookExist) {
      throw new Error('O livro selecionado não existe');
    }
    const alterBook = await this.prisma.book.update({
      where: {
        bar_code: id,
      },
      data,
    });
    return alterBook;
  }
  async delete(id: string) {
    const bookExist = await this.prisma.book.findFirst({
      where: {
        bar_code: id,
      },
    });
    if (!bookExist) {
      throw new Error('O livro selecionado não existe');
    }
    const DeletedBook = await this.prisma.book.delete({
      where: {
        bar_code: id,
      },
    });
    return DeletedBook;
  }
}
