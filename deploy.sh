#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

# 初始化git仓库（如果尚未初始化）
if [ ! -d ".git" ]; then
    git init
fi

# 检查deploy分支是否存在
git branch -a | grep -qw "deploy"

# 根据是否存在deploy分支，创建临时分支
if [ $? -eq 0 ]; then
    # deploy分支存在，直接切换到该分支
    git checkout deploy
else
    # deploy分支不存在，创建并切换到该分支
    git checkout -b deploy
fi
git add -A
git commit -m 'deploy'

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
git push -f https://github.com/Sewar-x/X-UI.git deploy:gh-pages
# 删除临时分支
git branch -D deploy
cd -
