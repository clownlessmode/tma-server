import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(private manager: EntityManager) {}
}
