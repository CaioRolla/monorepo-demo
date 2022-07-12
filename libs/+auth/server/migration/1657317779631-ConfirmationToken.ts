import {MigrationInterface, QueryRunner} from "typeorm";

export class ConfirmationToken1657317779631 implements MigrationInterface {
    name = 'ConfirmationToken1657317779631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`confirmationToken\` varchar(36) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`confirmationToken\``);
    }

}
