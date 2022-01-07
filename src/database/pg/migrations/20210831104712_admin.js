module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Admin', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            role_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email_verification_token: {
                type: Sequelize.TEXT,
            },
            is_email_verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            confirmation_otp: {
                type: Sequelize.STRING,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Admin'),
};
