const episodeIsLiked = (id: number, liked: { id: number }[] ): boolean => {
  return !!liked.find(like => like.id === id)
}

export default episodeIsLiked