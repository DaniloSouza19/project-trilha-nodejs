import { container } from 'tsyringe';

import { IDateProvider } from './dateProvider/IDateProvider';
import { DateFnsDateProvider } from './dateProvider/implementations/DateFnsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DateFnsDateProvider);
