module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Setting', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            is_app_maintenance: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            app_maintenance_message: {
                type: Sequelize.TEXT,
            },
            cms_expiry: {
                type: Sequelize.STRING,
            },
            app_expiry: {
                type: Sequelize.STRING,
            },
            terms_and_conditions: {
                type: Sequelize.TEXT,
            },
            limit_balance_billfazz: {
                type: Sequelize.DOUBLE,
            },
            limit_balance_aviana: {
                type: Sequelize.DOUBLE,
            },
            created_at: {
                type: Sequelize.DATE,
            },
            updated_at: {
                type: Sequelize.DATE,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Setting'),
};
