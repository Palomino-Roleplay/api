import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity("characters")
export class Character extends BaseEntity {
    @PrimaryColumn({
        type: "varchar",
        length: 32,
    })
    id: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    userId: string;

    @Column({
        type: "varchar",
        length: 32,
    })
    firstName: string;

    @Column({
        type: "varchar",
        length: 32,
    })
    lastName: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    model: string;

    @Column({
        type: "decimal",
        scale: 14,
        precision: 2,
    })
    money: number; // max: 999,999,999,999.99

    constructor(parameters: { id: string; name: string; userId: string }) {
        super();

        Object.assign(this, parameters);
    }
}