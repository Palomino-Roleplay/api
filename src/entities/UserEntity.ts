import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryColumn({
        type: "varchar",
        length: 32,
    })
    id: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    steamId: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    discordId: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(parameters: { id: string; steamId: string; discordId?: string }) {
        super();

        Object.assign(this, parameters);
    }
}