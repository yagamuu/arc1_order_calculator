export interface UnitParam {
    id: number;
    lv: number;
    paro: number;
    acs: number;
    speedUp: boolean;
    action: number;
}

export type unit = { id: number; unit: UnitParam };

export type unitList = Array<unit>;

export interface MapUnit {
  id: number;
  unitList: unitList;
}

export type mapUnitList = Array<MapUnit>;

export const mapUnitListData: mapUnitList = [
  {
    id: 0,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // コルボ平原
    id: 1,
    unitList: [
      {
        id: 0,
        unit: {
          id: 0, lv: 2, paro: 0, acs: 0, speedUp: false, action: 94,
        },
      },
      {
        id: 1,
        unit: {
          id: 3, lv: 2, paro: 0, acs: 0, speedUp: false, action: 96,
        },
      },
      {
        id: 2,
        unit: {
          id: 10, lv: 1, paro: 0, acs: 0, speedUp: false, action: 99,
        },
      },
      {
        id: 3,
        unit: {
          id: 9, lv: 1, paro: 0, acs: 0, speedUp: false, action: 97,
        },
      },
      {
        id: 4,
        unit: {
          id: 8, lv: 1, paro: 0, acs: 0, speedUp: false, action: 97,
        },
      },
      {
        id: 5,
        unit: {
          id: 18, lv: 1, paro: 0, acs: 0, speedUp: false, action: 96,
        },
      },
    ],
  },
  { // パレンシア城前
    id: 2,
    unitList: [
      {
        id: 0,
        unit: {
          id: 0, lv: 4, paro: 0, acs: 0, speedUp: false, action: 92,
        },
      },
      {
        id: 1,
        unit: {
          id: 1, lv: 3, paro: 0, acs: 0, speedUp: false, action: 94,
        },
      },
      {
        id: 2,
        unit: {
          id: 3, lv: 3, paro: 0, acs: 0, speedUp: false, action: 95,
        },
      },
      {
        id: 3,
        unit: {
          id: 10, lv: 1, paro: 0, acs: 0, speedUp: false, action: 99,
        },
      },
      {
        id: 4,
        unit: {
          id: 8, lv: 1, paro: 0, acs: 0, speedUp: false, action: 97,
        },
      },
      {
        id: 5,
        unit: {
          id: 12, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
        },
      },
      {
        id: 6,
        unit: {
          id: 14, lv: 1, paro: 0, acs: 0, speedUp: false, action: 94,
        },
      },
    ],
  },
  { // センバラの沼
    id: 3,
    unitList: [
      {
        id: 0,
        unit: {
          id: 0, lv: 6, paro: 1, acs: 0, speedUp: false, action: 89,
        },
      },
      {
        id: 1,
        unit: {
          id: 1, lv: 3, paro: 0, acs: 0, speedUp: false, action: 94,
        },
      },
      {
        id: 2,
        unit: {
          id: 3, lv: 3, paro: 0, acs: 0, speedUp: false, action: 95,
        },
      },
      {
        id: 3,
        unit: {
          id: 22, lv: 1, paro: 0, acs: 0, speedUp: false, action: 86,
        },
      },
      {
        id: 4,
        unit: {
          id: 13, lv: 1, paro: 0, acs: 0, speedUp: false, action: 90,
        },
      },
    ],
  },
  { // ルワジの森
    id: 4,
    unitList: [
      {
        id: 0,
        unit: {
          id: 0, lv: 9, paro: 1, acs: 0, speedUp: false, action: 86,
        },
      },
      {
        id: 1,
        unit: {
          id: 1, lv: 3, paro: 0, acs: 0, speedUp: false, action: 94,
        },
      },
      {
        id: 2,
        unit: {
          id: 3, lv: 3, paro: 0, acs: 0, speedUp: false, action: 95,
        },
      },
      {
        id: 3,
        unit: {
          id: 13, lv: 1, paro: 0, acs: 0, speedUp: false, action: 90,
        },
      },
      {
        id: 4,
        unit: {
          id: 26, lv: 1, paro: 0, acs: 0, speedUp: false, action: 90,
        },
      },
      {
        id: 5,
        unit: {
          id: 19, lv: 1, paro: 0, acs: 0, speedUp: false, action: 94,
        },
      },
    ],
  },
  { // トヨーケの森
    id: 5,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // パレンシア城地下倉庫
    id: 6,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // オルニスの丘
    id: 7,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 遺跡ダンジョン地下1階
    id: 8,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 遺跡ダンジョン地下2階
    id: 9,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 遺跡ダンジョン地下3階
    id: 10,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 遺跡ダンジョン地下4階
    id: 11,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // アゼンダ高地
    id: 12,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // ラマダ寺
    id: 13,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // ラマダ山
    id: 14,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 闘技場
    id: 15,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // サリュ族の村
    id: 16,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 水の神殿
    id: 17,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 水の神殿内部
    id: 18,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // パレンシア城地下研究所
    id: 19,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // エレベーター前
    id: 20,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 精霊の山
    id: 21,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 封印の滝
    id: 22,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
  { // 幻界
    id: 23,
    unitList: [{
      id: 0,
      unit: {
        id: 0, lv: 1, paro: 0, acs: 0, speedUp: false, action: 95,
      },
    }],
  },
];
