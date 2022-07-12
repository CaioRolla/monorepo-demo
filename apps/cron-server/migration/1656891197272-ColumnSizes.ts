import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnSizes1656891197272 implements MigrationInterface {
    name = 'ColumnSizes1656891197272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`execution\` MODIFY COLUMN \`status\` varchar(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`execution\` MODIFY COLUMN \`method\` varchar(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`execution\` MODIFY COLUMN \`cronExpression\` varchar(25) NULL`);
        await queryRunner.query(`ALTER TABLE \`execution\` MODIFY COLUMN \`timezone\` varchar(45) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
