import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("sessions_gameserver")
export class GameServerSession extends BaseEntity {
    @PrimaryColumn({
        type: "varchar",
        length: 64,
    })
    id: string;

    @Column({
        type: "varchar",
        length: 32,
    })
    gameServerId: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    ip: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: "timestamp",
        nullable: true,
    })
    endedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(parameters: { id: string; gameServerId: string; ip: string }) {
        super();

        Object.assign(this, parameters);
    }
}