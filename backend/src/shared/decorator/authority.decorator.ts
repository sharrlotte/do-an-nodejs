import { Reflector } from '@nestjs/core';

export const Authorities = Reflector.createDecorator<string[]>();
