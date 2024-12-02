import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity("game_servers")
export class GameServer extends BaseEntity {
    @PrimaryColumn({
        type: "varchar",
        length: 32,
    })
    id: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    secret: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(parameters: { id: string; name: string; secret: string }) {
        super();

        Object.assign(this, parameters);
    }
}