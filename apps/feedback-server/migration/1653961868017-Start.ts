import {MigrationInterface, QueryRunner} from "typeorm";

export class Start1653961868017 implements MigrationInterface {
    name = 'Start1653961868017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` char(36) NOT NULL, \`status\` varchar(100) NOT NULL, \`plan\` varchar(100) NOT NULL DEFAULT 'UNSET', \`stripeSubscriptionId\` varchar(255) NULL, \`stripeCustomerId\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`interview\` (\`id\` char(36) NOT NULL, \`primaryQuestionAnswer\` int NULL, \`openQuestionTitle\` varchar(500) NULL, \`openQuestionAnswer\` text NULL, \`url\` text NOT NULL, \`overQuota\` tinyint NOT NULL DEFAULT 0, \`startedAt\` timestamp NULL, \`finishedAt\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`surveyId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`survey\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` text NULL, \`customLogo\` tinyint NOT NULL DEFAULT 0, \`logoUrl\` text NULL, \`status\` varchar(40) NOT NULL DEFAULT 'DRAFT', \`type\` varchar(40) NULL, \`primaryQuestionTitle\` varchar(500) NULL, \`template\` text NULL, \`redirectAfterCompleted\` tinyint NOT NULL DEFAULT 0, \`redirectAfterCompletedUrl\` varchar(500) NULL, \`openQuestionEnabled\` tinyint NOT NULL DEFAULT 1, \`openQuestionOptional\` tinyint NULL, \`openQuestionTitle\` varchar(500) NULL DEFAULT 'Please share your thoughts about our Newsletter and how we can improve it.', \`canAnswerMultipleTimes\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`accountId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`identifier\` (\`id\` char(36) NOT NULL, \`key\` varchar(500) NOT NULL, \`primary\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`surveyId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`identifier_value\` (\`id\` char(36) NOT NULL, \`value\` text NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`identifierId\` char(36) NULL, \`interviewId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`integration\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`accountId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`integration_webhook\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`event\` varchar(255) NOT NULL, \`url\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`integrationId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` char(36) NULL, \`accountId\` char(36) NULL, UNIQUE INDEX \`REL_08023c572a6a0a22798c56d6c1\` (\`userId\`), UNIQUE INDEX \`REL_d681a74722b577ba983124a55f\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`interview\` ADD CONSTRAINT \`FK_f6cbdc938f1a6f5d3f650c41897\` FOREIGN KEY (\`surveyId\`) REFERENCES \`survey\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`survey\` ADD CONSTRAINT \`FK_4f4b23719bd25504b35d3a2c787\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`identifier\` ADD CONSTRAINT \`FK_c65d8df53893ffc039f9340eabb\` FOREIGN KEY (\`surveyId\`) REFERENCES \`survey\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`identifier_value\` ADD CONSTRAINT \`FK_4757294df240f395e14c04d3798\` FOREIGN KEY (\`identifierId\`) REFERENCES \`identifier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`identifier_value\` ADD CONSTRAINT \`FK_03a4862ce2927e6c3c6705cd02c\` FOREIGN KEY (\`interviewId\`) REFERENCES \`interview\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`integration\` ADD CONSTRAINT \`FK_80e6cffdf7e741037acf8a8c1a1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`integration_webhook\` ADD CONSTRAINT \`FK_6fc8e8753c3a8eb79c7849f10b8\` FOREIGN KEY (\`integrationId\`) REFERENCES \`integration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_08023c572a6a0a22798c56d6c17\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_d681a74722b577ba983124a55f5\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
        await queryRunner.query(`set foreign_key_checks = 0;`);
        await queryRunner.query(`ALTER TABLE \`interview\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`survey\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`identifier\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`identifier_value\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`identifier_value\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`integration\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`integration_webhook\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`user_account\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`ALTER TABLE \`user_account\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`);
        await queryRunner.query(`set foreign_key_checks = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_d681a74722b577ba983124a55f5\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_08023c572a6a0a22798c56d6c17\``);
        await queryRunner.query(`ALTER TABLE \`integration_webhook\` DROP FOREIGN KEY \`FK_6fc8e8753c3a8eb79c7849f10b8\``);
        await queryRunner.query(`ALTER TABLE \`integration\` DROP FOREIGN KEY \`FK_80e6cffdf7e741037acf8a8c1a1\``);
        await queryRunner.query(`ALTER TABLE \`identifier_value\` DROP FOREIGN KEY \`FK_03a4862ce2927e6c3c6705cd02c\``);
        await queryRunner.query(`ALTER TABLE \`identifier_value\` DROP FOREIGN KEY \`FK_4757294df240f395e14c04d3798\``);
        await queryRunner.query(`ALTER TABLE \`identifier\` DROP FOREIGN KEY \`FK_c65d8df53893ffc039f9340eabb\``);
        await queryRunner.query(`ALTER TABLE \`survey\` DROP FOREIGN KEY \`FK_4f4b23719bd25504b35d3a2c787\``);
        await queryRunner.query(`ALTER TABLE \`interview\` DROP FOREIGN KEY \`FK_f6cbdc938f1a6f5d3f650c41897\``);
        await queryRunner.query(`DROP INDEX \`REL_d681a74722b577ba983124a55f\` ON \`user_account\``);
        await queryRunner.query(`DROP INDEX \`REL_08023c572a6a0a22798c56d6c1\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP TABLE \`integration_webhook\``);
        await queryRunner.query(`DROP TABLE \`integration\``);
        await queryRunner.query(`DROP TABLE \`identifier_value\``);
        await queryRunner.query(`DROP TABLE \`identifier\``);
        await queryRunner.query(`DROP TABLE \`survey\``);
        await queryRunner.query(`DROP TABLE \`interview\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
