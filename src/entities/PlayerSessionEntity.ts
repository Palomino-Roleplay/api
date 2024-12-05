import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { GameServer } from "./GameServerEntity";
import { GameServerSession } from "./GameServerSessionEntity";

@Entity("sessions_player")
export class PlayerSession extends BaseEntity {
    @PrimaryColumn({
        type: "varchar",
        length: 64,
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

    @Column({
        type: "varchar",
        length: 64,
    })
    gameServerId: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    gameServerSessionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: "timestamp",
        nullable: true,
    })
    endedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => GameServer)
    @JoinColumn({ name: "gameServerId" })
    gameServer: GameServer;

    @ManyToOne(() => GameServerSession)
    @JoinColumn({ name: "gameServerSessionId" })
    gameServerSession: GameServerSession;

    constructor(parameters: { id: string; userId: string; ip:string; gameServerId: string; gameServerSessionId: string }) {
        super();

        Object.assign(this, parameters);
    }
}