#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
git push -f https://github.com/Sewar-x/Sewar-x.github.io.git main:main

cd -
