const GetClassNames = (target: HTMLElement): string[] =>
  String(target.classList).split(' ')

export default GetClassNames
