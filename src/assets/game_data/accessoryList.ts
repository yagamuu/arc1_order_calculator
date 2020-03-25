export type accessory = {id: number; name: string; pow: number };

export type accessoryList = Array<accessory>;

export const accessoryListData: accessoryList = [
  { id: 0, name: 'なし', pow: 1.0 },
  { id: 1, name: '疾風のバンダナ', pow: 1.1 },
  { id: 2, name: 'ハイパーブーツ', pow: 1.3 },
];
