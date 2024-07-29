const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const DeployConfig = require("./config.ts");

/**
 * 上传文件函数
 */
async function upload() {
  const config = await DeployConfig.getFtpDeployConfig();
  ftpDeploy
    .deploy(config)
    .then((res) => console.log('finished:', res))
    .catch((err) => console.log(err))

  ftpDeploy.on('uploading', function (data) {
    console.log('total file count being transferred: ', data.totalFilesCount) // total file count being transferred
    console.log(data.transferredFileCount, ' of files transferred') // number of files transferred
    console.log('partial path with filename being uploaded:', data.filename) // partial path with filename being uploaded
  })

  ftpDeploy.on('uploaded', function (data) {
    console.log('uploaded: ', data) // same data as uploading event
  })

  ftpDeploy.on('upload-error', function (data) {
    console.log('upload error: ', data.err) // data will also include filename, relativePath, and other goodies
  })

}

upload()
