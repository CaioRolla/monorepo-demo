import {MigrationInterface, QueryRunner} from "typeorm";

export class ScheduleStats1656854901598 implements MigrationInterface {
    name = 'ScheduleStats1656854901598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`statsFailedexecutions\` bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`statsSuccessfulexecutions\` bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`statsLastexecutionstatus\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`statsLastexecutionstatus\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`statsSuccessfulexecutions\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`statsFailedexecutions\``);
    }

}
