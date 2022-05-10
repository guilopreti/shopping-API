import { MigrationInterface, QueryRunner } from "typeorm";

export class createCartUser1652147598474 implements MigrationInterface {
    name = 'createCartUser1652147598474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL, "subtotal" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_342497b574edb2309ec8c6b62aa" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
