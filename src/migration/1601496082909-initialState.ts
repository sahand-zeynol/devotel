import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialState1601496082909 implements MigrationInterface {
  name = 'initialState1601496082909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
