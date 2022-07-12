import {MigrationInterface, QueryRunner} from "typeorm";

export class UserStatus1657335258955 implements MigrationInterface {
    name = 'UserStatus1657335258955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` varchar(36) NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

}
