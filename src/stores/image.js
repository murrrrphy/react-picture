import {observable, action, makeObservable} from 'mobx'
import {Uploader} from '../models'
import {message} from 'antd'

class ImageStore {
  constructor() {
    makeObservable(this)
  }

  @observable filename = ''
  @observable file = null
  @observable isLoading = false
  @observable serverFile = null

  @action setFilename(newFilename) {
    this.filename = newFilename
  }

  @action setFile(newFile) {
    this.file = newFile
  }

  @action uploader() {
    this.isLoading = true
    this.serverFile = null
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
        .then(serverFile => {
          this.serverFile = serverFile
          resolve(serverFile)
        })
        .catch(err => {
          message.error('上传失败')
          reject(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    })
  }

  @action reset() {
    this.isLoading = false
    this.serverFile = null
  }
}

export default new ImageStore()