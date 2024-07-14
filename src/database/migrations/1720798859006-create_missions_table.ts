import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { MAGIC_MOVERS } from '../tables.constant';

export class CreateMissionsTable1720798859006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const missionsTable = new Table({
      name: 'missions',
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
          name: 'mover_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'items_ids',
          type: 'jsonb',
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
      foreignKeys: [
        {
          columnNames: ['mover_id'],
          referencedColumnNames: ['id'],
          referencedTableName: MAGIC_MOVERS,
        },
      ],
      indices: [
        {
          columnNames: ['mover_id', 'status'],
        },
      ],
    });
    await queryRunner.createTable(missionsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('missions');
  }
}
