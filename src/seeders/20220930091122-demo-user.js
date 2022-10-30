'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [{
    email: 'admin@gmail.com',
    password: '123456',
    firstName: 'Dao',
    lastName: 'Tan',
    address: 'HUTECH',
    phonenumber: '0336062711',
    gender: '',
    image: '',
    positionId: '',
    roleId: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
