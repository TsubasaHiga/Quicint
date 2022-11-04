const Sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000, 'foo'))
}

export default Sleep
