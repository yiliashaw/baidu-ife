# baidu-ife

    gulp lint               语法检查
    gulp lint-fix           语法检查, 并自动修改语法风格

提交前 git commit 会自动调用 gulp lint , 检查语法, 报错分为几种情况:

0. 语法错误, 例如 let 1 = 1 , 需要提交者自己修改代码
0. 不安全的操作, 如 if( a == 1) 需要提交者自己修改代码
0. 不统一的代码风格, 如行尾空格/对象直接量最后一个属性没加逗号等, 可以运行 gulp lint-fix 自动修改
