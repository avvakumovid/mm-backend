import { ValidationPipe, Injectable, ArgumentMetadata, BadRequestException, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
    public async transform(value, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata)
        } catch (e) {
            throw new UnprocessableEntityException(e.response.message);
        }
    }

}