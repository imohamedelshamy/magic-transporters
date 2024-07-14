import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMagicMoversTable1720797903250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const magicMoversTable = new Table({
      name: 'magic_movers',
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
          name: 'weight_limit',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'energy_capacity',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'current_energy',
          type: 'int',
          default: 0,
          isNullable: false,
        },
        {
          name: 'quest_state',
          type: 'varchar',
          default: "'resting'",
          isNullable: false,
        },
        {
          name: 'magic_items_ids',
          type: 'jsonb',
          isNullable: true,
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
    await queryRunner.createTable(magicMoversTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('magic_movers');
  }
}
