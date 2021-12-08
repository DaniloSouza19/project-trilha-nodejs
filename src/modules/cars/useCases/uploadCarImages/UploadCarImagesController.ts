import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImagesUseCase';

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const image_names = images.map((file) => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    await uploadCarImageUseCase.execute({
      car_id: id,
      image_names,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
