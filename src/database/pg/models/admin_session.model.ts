import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
} from 'sequelize-typescript';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';

@Table({
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'AdminSession',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class AdminSession extends Model<AdminSession> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id?: bigint;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    admin_id: bigint;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    session: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    expiry_value: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_logged_in: boolean;

    @Column({
        type: DataType.DATE,
    })
    expired_at: string;

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
}
