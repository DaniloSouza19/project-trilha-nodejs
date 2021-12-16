import { differenceInHours, parseISO } from 'date-fns';

import { IDateProvider } from '../IDateProvider';

class DateFnsDateProvider implements IDateProvider {
  differenceInHours(dateLeft: Date, dateRight: Date): number {
    const hoursDiff = differenceInHours(dateLeft, dateRight);

    return hoursDiff;
  }

  stringDateToIso(date: string): Date {
    return parseISO(date);
  }
}

export { DateFnsDateProvider };
