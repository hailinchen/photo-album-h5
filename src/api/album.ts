import Request from '../common/meilianRequest'

export const getAlbumList = (page: number = 1, templateId: string = '') => {
  return Request.get(`/api/models/${page}`, { page, template_id: templateId })
}
