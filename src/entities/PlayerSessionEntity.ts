import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("player_sessions")
export class PlayerSession extends BaseEntity {
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
    ip: string;

    // createdAt
    @CreateDateColumn()
    createdAt: Date;

    // updatedAt
    @UpdateDateColumn()
    updatedAt: Date;


    constructor(parameters: { id: string; name: string; userId: string }) {
        super();

        Object.assign(this, parameters);
    }
}