import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth1653961868017 implements MigrationInterface {
    name = 'Auth1653961868016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` char(36) NOT NULL, \`apiKey\` char(36) NOT NULL, \`email\` varchar(320) NULL, \`ref\` varchar(500) NULL, \`permissions\` text NOT NULL, \`displayName\` varchar(500) NOT NULL, \`accessToken\` varchar(500) NULL, \`rapidAPIusername\` varchar(500) NULL, \`refreshToken\` varchar(500) NULL, \`profilePicUrl\` text NULL, \`password\` varchar(320) NULL, \`givenName\` varchar(255) NULL, \`familyName\` varchar(255) NULL, \`isRapidAPIuser\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
