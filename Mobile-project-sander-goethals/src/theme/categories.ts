export const categoryColors = {
  wellness: {
    even: '#C8DAD3',
    odd: '#A3C1AD',
    loader: '#7FC3A0'
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
} as const;

export type CategoryKey = keyof typeof categoryColors;