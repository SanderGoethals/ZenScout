export const categoryColors = {
  wellness: {
    first: "#DFF3F5",
    second: "#C6E7EB",
    third: "#7FCAD3",
  },
  publicSauna: {
    first: '#EEE7F4',
    second: '#D8CDE8',
    third:'#9B86B8'
  },
  privateSauna: {
    first: '#DCE9F2', 
    second: '#C4D7E6', 
    third: '#7FA9C9', 
  },
  massageAndBeauty: {
    first: '#F2DDD8', 
    second: '#E6C7BF', 
    third: '#B27C76', 
  },
  spaBasic: {
    first:  "rgb(190, 225,  255, 0.8)",
    second: "rgb(178, 225,  255, 0.8)",
    third:  "rgb(78, 225, 255, 0.8)"

  },
  main: {
    first: '#C8DAD3',
    second: '#A3C1AD',
    third: '#DFF3F5'
  },
  profile: {
    first: '#E2D6BF',
    second: '#EEE6D6',
    third: '#F5EFE6'
  },
  login: {
    buttonColor: '#8B6F47',
    backgroundColor: '#F5F1EB',
    disabledButtonColor: '#C3B8A3',
  },
} as const;

export type CategoryKey = keyof typeof categoryColors;
export type Variant = 'loader' | 'buttonColor' | 'backgroundColor' | 'disabledButtonColor' | 'first' | 'second' | 'third';