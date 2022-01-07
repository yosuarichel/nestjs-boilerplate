// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

module.exports = {
    up: async (queryInterface) => {
        const newData = [];
        const rawData = fs.readFileSync('./src/masterdata/admin_role.json');
        const Datas = JSON.parse(rawData);
        await Promise.all(
            Datas.map(async (x) => {
                const seedData = {
                    name: x.name.toUpperCase(),
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                newData.push(seedData);
            }),
        );

        return queryInterface.bulkInsert('AdminRole', newData);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('AdminRole', null, {
            truncate: true,
            restartIdentity: true,
        }),
};
