import { DEVELOPMENT, PRODUCTION, SEQUELIZE } from './../../../constants/';
import { databaseConfig } from './database.config';
import { TEST } from './../../../constants/index';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Spend } from 'src/spend/spend.model';
import { Category } from 'src/category/category.model';
import { UserSpends } from 'src/spend/user-spends.model';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development
                break;

            case TEST:
                config = databaseConfig.test
                break;
            case PRODUCTION:
                config = databaseConfig.production
            default:
                config = databaseConfig.development
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Spend, Category, UserSpends])
        await sequelize.sync()
        return sequelize
    }
}]