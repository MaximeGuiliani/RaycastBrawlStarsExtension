interface IClubData {
  tag: string;
  name: string;
  description: string;
  trophies: number;
  requiredTrophies: number;
  members:[{
    icon: {
      id: number;
    }
    tag: string;
    name: string;
    trophies: number;
    role: string;
    nameColor: string;
  }]
  type: string;
  badgeId: number;
}
