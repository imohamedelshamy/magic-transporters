import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMagicItemsTable1720798529118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const magicItemsTable = new Table({
      name: 'magic_items',
      columns: [
        {
          name: 'id',
          type: 'int',
          generatedIdentity: 'ALWAYS',
          generationStrategy: 'increment',
          isGenerated: true,
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'weight',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'energy_takes',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    });
    await queryRunner.createTable(magicItemsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('magic_items');
  }
}
