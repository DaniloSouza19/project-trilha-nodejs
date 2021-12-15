interface IDateProvider {
  differenceInHours(dateLeft: Date, dateRight: Date): number;
}

export { IDateProvider };
