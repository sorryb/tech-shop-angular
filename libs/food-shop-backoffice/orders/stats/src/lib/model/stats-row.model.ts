export interface StatsRow {
  statsTitle: string;
  fromStats: string;
  toStats: string;
  rightSummary: {
    data: number;
    dataSuffix: string;
  };
}
