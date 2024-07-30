const deployConfig = require("./serverConfig.ts");




module.exports.getFtpDeployConfig = async function getFtpDeployConfig() {
  const config = await deployConfig()
  return {
    user: config.user, // 服务器登录账号
    password: config.password, // 服务器密码
    host: config.host, // 服务器地址
    port: config.port, // ftp的服务器端口
    localRoot: config.localRoot, // 上传的文件
    remoteRoot: config.remoteRoot, // 远程服务器文件存储路径
    include: ['*', '**/*'],// 这将上传除了点文件之外的所有文件
    // 排除sourcemaps和node_modules中的所有文件
    exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    deleteRemote: true, // 如果为true，则在上传前删除目的地的所有现有文件
    forcePasv: true, // 主动模式/被动模式
    sftp: false, // 使用 sftp协议 或 ftp协议
  };
};
