import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { AdminRole } from '@app/models/pg';

@Table({
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'Admin',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Admin extends Model<Admin> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id?: bigint;

    @ForeignKey(() => AdminRole)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    role_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.TEXT,
    })
    email_verification_token?: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_email_verified?: boolean;

    @Column({
        type: DataType.STRING,
    })
    confirmation_otp?: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active?: boolean;

    @Column({
        type: DataType.DATE,
        get() {
            if (this.getDataValue('created_at'))
                return moment(this.getDataValue('created_at'))
                    .tz('Asia/Jakarta')
                    .format();
            return null;
        },
        set(value) {
            if (value)
                this.setDataValue(
                    'created_at',
                    momentTz.tz(value, 'Asia/Jakarta').toISOString(),
                );
        },
    })
    created_at?: string;

    @Column({
        type: DataType.DATE,
        get() {
            if (this.getDataValue('updated_at'))
                return moment(this.getDataValue('updated_at'))
                    .tz('Asia/Jakarta')
                    .format();
            return null;
        },
        set(value) {
            if (value)
                this.setDataValue(
                    'updated_at',
                    momentTz.tz(value, 'Asia/Jakarta').toISOString(),
                );
        },
    })
    updated_at?: string;

    @Column({
        type: DataType.DATE,
        get() {
            if (this.getDataValue('deleted_at'))
                return moment(this.getDataValue('deleted_at'))
                    .tz('Asia/Jakarta')
                    .format();
            return null;
        },
        set(value) {
            if (value)
                this.setDataValue(
                    'deleted_at',
                    momentTz.tz(value, 'Asia/Jakarta').toISOString(),
                );
        },
    })
    deleted_at?: string;

    @BelongsTo(() => AdminRole)
    admin_role?: AdminRole;
}
