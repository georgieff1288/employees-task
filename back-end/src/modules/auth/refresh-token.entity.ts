import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Refresh_Token extends Model {
    @Column
    user_id: number;

    @Column
    token: string

    @Column
    expiration_date: string
}