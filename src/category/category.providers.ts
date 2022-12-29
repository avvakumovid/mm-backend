import { CATEGORY_REPOSITORY } from './../../constants/index';
import { Category } from './category.model';

export const gategoryProviders = [{
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
}];