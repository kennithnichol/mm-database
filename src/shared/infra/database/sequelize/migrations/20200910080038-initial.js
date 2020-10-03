import runner from '../runner'
import { query } from 'express';

export default {
  up: async (queryInterface, Sequelize) => {
    const CREATE_BASE_USER = () => {
      return queryInterface.createTable('base_user', {
        base_user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_email: {
            type: Sequelize.STRING(250),
            allowNull: false,
            unique: true
        },
        is_email_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
        username: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },
        is_admin_user: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      })
    }

    const CREATE_MEMBER = () => {
      queryInterface.createTable('member', {
        member_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        member_base_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'base_user',
                key: 'base_user_id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      })
    }

    await runner.run([
      () => CREATE_BASE_USER(),
      () => CREATE_MEMBER()
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('member'),
      () => queryInterface.dropTable('base_user')
    ])
  }
};
