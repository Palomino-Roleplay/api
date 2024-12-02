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
        length: 255,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    model: string;

    constructor(parameters: { id: string; name: string; userId: string }) {
        super();

        Object.assign(this, parameters);
    }
}