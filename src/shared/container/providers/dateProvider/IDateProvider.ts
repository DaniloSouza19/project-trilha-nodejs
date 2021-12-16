interface IDateProvider {
  differenceInHours(dateLeft: Date, dateRight: Date): number;
  stringDateToIso(date: string | Date): Date;
}

export { IDateProvider };
