import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateScheduleStats1656855084701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`schedule\` as sch SET statsFailedexecutions=(SELECT count(*) FROM execution ex WHERE ex.scheduleId = sch.id AND ex.status IN ("FAILURE", "ABORTED", "ACCOUNT_LIMIT") )`
    );
    await queryRunner.query(
      `UPDATE \`schedule\` as sch SET statsSuccessfulexecutions=(SELECT count(*) FROM execution ex WHERE ex.scheduleId = sch.id AND ex.status="SUCCESS" )`
    );
    await queryRunner.query(
      `UPDATE \`schedule\` as sch SET statsLastexecutionstatus=(SELECT status FROM execution ex WHERE ex.scheduleId = sch.id ORDER BY createdAt DESC LIMIT 1);`
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`schedule\` as sch SET statsFailedexecutions=0`
    );
  }
}
