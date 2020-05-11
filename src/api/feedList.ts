import Request from '../common/request'
const baseURL = '/V1/mini2'

interface FeedOptions {
  ctype?: number
  is_first_run?: number
  last_play_quantity?: number
  live_id?: string
  paging_index?: number
  square_id?: number
}

export const getFeedList = (
  opts: FeedOptions = {
    ctype: 1,
    is_first_run: 1,
    last_play_quantity: 0,
    live_id: '681895_xQB0',
    paging_index: 1,
    square_id: -1,
  }
) => {
  return Request.post(baseURL + '/v26/square/post/list', { ...opts })
}
