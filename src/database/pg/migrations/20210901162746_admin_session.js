module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('AdminSession', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            admin_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            session: {
                type: Sequelize.STRING,
            },
            expiry_value: {
                type: Sequelize.INTEGER,
            },
            is_logged_in: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            expired_at: {
                type: Sequelize.DATE,
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
    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('AdminSession'),
};
