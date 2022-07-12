import {MigrationInterface, QueryRunner} from "typeorm";

export class Start1656729162397 implements MigrationInterface {
    name = 'Start1656729162397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(320) NULL, \`phone\` varchar(320) NULL, \`status\` varchar(100) NOT NULL, \`plan\` varchar(100) NOT NULL, \`planType\` varchar(100) NULL, \`stripeSubscriptionId\` varchar(255) NULL, \`stripeCustomerId\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` varchar(500) NULL, \`url\` varchar(500) NOT NULL, \`type\` varchar(255) NOT NULL, \`method\` varchar(255) NOT NULL, \`responseType\` varchar(255) NOT NULL DEFAULT 'text', \`trigger\` timestamp NULL, \`cronExpression\` varchar(100) NULL, \`notifyOnError\` tinyint NOT NULL DEFAULT 0, \`notifyEmail\` varchar(250) NULL, \`timezone\` varchar(100) NULL, \`headersString\` text NOT NULL, \`payload\` text NOT NULL, \`status\` varchar(100) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`accountId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`execution\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(100) NOT NULL, \`url\` varchar(500) NOT NULL, \`method\` varchar(255) NOT NULL, \`trigger\` timestamp NULL, \`cronExpression\` varchar(100) NULL, \`timezone\` varchar(100) NULL, \`headersString\` text NOT NULL, \`payload\` text NOT NULL, \`responseTime\` int NOT NULL DEFAULT '0', \`responseData\` text NULL, \`responseStatus\` int NULL, \`responseHeadersString\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`scheduleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` varchar(36) NULL, \`accountId\` varchar(36) NULL, UNIQUE INDEX \`REL_08023c572a6a0a22798c56d6c1\` (\`userId\`), UNIQUE INDEX \`REL_d681a74722b577ba983124a55f\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_cdbe1e9e53bf53019a461c63bde\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`execution\` ADD CONSTRAINT \`FK_e211f69a8561a5d02c116ade10e\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_08023c572a6a0a22798c56d6c17\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_d681a74722b577ba983124a55f5\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_d681a74722b577ba983124a55f5\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_08023c572a6a0a22798c56d6c17\``);
        await queryRunner.query(`ALTER TABLE \`execution\` DROP FOREIGN KEY \`FK_e211f69a8561a5d02c116ade10e\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_cdbe1e9e53bf53019a461c63bde\``);
        await queryRunner.query(`DROP INDEX \`REL_d681a74722b577ba983124a55f\` ON \`user_account\``);
        await queryRunner.query(`DROP INDEX \`REL_08023c572a6a0a22798c56d6c1\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP TABLE \`execution\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
