export const categoryColors = {
  wellness: {
    even: "#DFF3F5",
    odd: "#C6E7EB",
    loader: "#7FCAD3",
  },
  publicSauna: {
    even: '#EEE7F4',
    odd: '#D8CDE8',
    loader:'#9B86B8'
  },
  privateSauna: {
    even: '#DCE9F2', 
    odd: '#C4D7E6', 
    loader: '#7FA9C9', 
  },
  massageAndBeauty: {
    even: '#F2DDD8', 
    odd: '#E6C7BF', 
    loader: '#B27C76', 
  },
  main: {
    first: '#C8DAD3',
    second: '#A3C1AD',
    third: '#DFF3F5'
  },
  profile: {
    even: '#E2D6BF',
    odd: '#EEE6D6',
    loader: '#F5EFE6'
  },
  login: {
    buttonColor: '#8B6F47',
    backgroundColor: '#F5F1EB',
    disabledButtonColor: '#C3B8A3',
  },
} as const;

export type CategoryKey = keyof typeof categoryColors;
export type Variant = 'even' | 'odd' | 'loader' | 'buttonColor' | 'backgroundColor' | 'disabledButtonColor' | 'first' | 'second' | 'third';