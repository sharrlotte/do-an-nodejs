import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

const authorities = ['MANAGE_USER', 'VIEW_REPORT', 'VIEW_TRANSACTION', 'MANAGE_CATEGORY'];

const defaultAuthorities = authorities.map((authority, index) => ({
  id: index,
  name: authority,
  description: authority,
  createdAt: new Date(),
}));

@Injectable()
export class AuthoritiesService implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}

  onModuleInit() {
    defaultAuthorities.forEach(async (authority) => {
      await this.prismaService.authority.upsert({
        where: {
          name: authority.name,
        },
        create: authority,
        update: authority,
      });
    });
  }
}
