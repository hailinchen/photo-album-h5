declare global {
  namespace Ajax {
    interface Response<T = any> {
      Code: number,
      Msg: string,
      Data: T
    }
  }
}

export {
  Ajax
}