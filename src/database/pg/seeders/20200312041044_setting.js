// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

module.exports = {
    up: async (queryInterface) => {
        const newData = [];
        const rawData = fs.readFileSync('./src/masterdata/setting.json');
        const Datas = JSON.parse(rawData);
        await Promise.all(
            Datas.map(async (x) => {
                const seedData = {
                    is_app_maintenance: x.is_app_maintenance,
                    app_maintenance_message: x.app_maintenance_message,
                    app_expiry: x.app_expiry,
                    cms_expiry: x.cms_expiry,
                    terms_and_conditions: x.terms_and_conditions,
                    limit_balance_billfazz: x.limit_balance_billfazz,
                    limit_balance_aviana: x.limit_balance_aviana,
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                newData.push(seedData);
            }),
        );

        return queryInterface.bulkInsert('Setting', newData);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Setting', null, {
            truncate: true,
            restartIdentity: true,
        }),
};
