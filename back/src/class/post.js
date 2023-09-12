class Post {
  static #list = []
  static #count = 1

  constructor(userName, text) {
    this.id = Post.#count++

    this.userName = userName
    this.text = text
    this.date = new Date().getTime()

    this.reply = []
  }

  static create = (userName, text, post) => {
    const newPost = new Post(userName, text)

    if (post) {
      post.reply.push(newPost)

      console.log(post)
    } else {
      this.#list.push(newPost)
    }

    console.log(this.#list)

    return newPost
  }

  static getById = (id) => {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => {
    return this.#list
  }
}

module.exports = {
  Post,
}
