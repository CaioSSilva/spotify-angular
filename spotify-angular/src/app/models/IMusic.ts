export interface IMusic {
  id: string,
  uri:string,
  title: string,
  artists: {
    id: string,
    name: string
  }[],
  album: {
    id: string,
    name: string,
    imageURL: string
  },
  duration:string
}
