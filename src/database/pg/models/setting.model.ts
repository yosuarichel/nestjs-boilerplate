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
    tableName: 'Setting',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class Setting extends Model<Setting> {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id?: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_app_maintenance: boolean;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    app_maintenance_message: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cms_expiry: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    app_expiry: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    terms_and_conditions: string;

    @Column({
        type: DataType.DOUBLE,
        defaultValue: 500000,
    })
    limit_balance_billfazz: number;

    @Column({
        type: DataType.DOUBLE,
        defaultValue: 500000,
    })
    limit_balance_aviana: number;

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
