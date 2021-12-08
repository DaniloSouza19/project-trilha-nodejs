import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  image_names: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImageRepository: ICarsImagesRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, image_names }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists');
    }

    /**
     * Remove old car images from database and disk
     */
    carExists.images.map(async (image) => {
      await Promise.all([
        await deleteFile(`./tmp/cars/${image.image_name}`),
        await this.carsImageRepository.delete(image.id),
      ]);
    });

    image_names.map(async (image_name) => {
      await this.carsImageRepository.create({
        car_id,
        image_name,
      });
    });
  }
}

export { UploadCarImageUseCase };
