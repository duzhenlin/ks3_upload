# ks3_upload
ksyun  ks3 for JavaScript
金山云上传 vue版本

[![npm](https://img.shields.io/npm/v/ks3_upload.svg)]()

ks3_upload是一个基于Vue,iview封装金山云对象存储上传模块。

## Install
```
npm install ks3_upload 
或者
npm install ks3_upload  --registry=https://registry.npmjs.org/
```
## Use
模块依赖iView请先安装引入"iview": "^3.2.2"
```
import ks3Upload from 'ks3_upload'
import 'ks3_upload/dist/ks3_upload.css'
Vue.use(ks3Upload)

<ks3-upload :Signature="Signature" v-if="Signature"></ks3-upload>
```

## Develop
```
npm install
npm run dev
```

## Props
prop              | descripton                   | type                   | value
------------------|------------------------------|:----------------------:|---------------------
Signature         | 上传所用的签名等信息           | Object                 |`{Policy:"Policy",Signature:"Signature",KSSAccessKeyId:"KSSAccessKeyId",bucket:"bucket",region:"region",domain:"domain"}`
mime_types        | 允许上传的文件类型             | Array                | `[{title:"files ",extensions:"mp4,mov"}]`
max_file_size     | 限制上传大小                   | String                | 3gb
prevent_duplicates| 是否可以重复选用               | Boolean               | true
module            | 模块名称（可不填）               | String               | core


## UrlPath
#### 类型

| 图片  | 视频,音频   |   其他类型 |
| ------------ | ------------ | ------------ |
|  image | media  | files  |


#### 生成文件路径模板

/类型/模块名称(不填可省略)/YYYYMM/DD/文件名(暂用32位随机字符串)

## Events
event             | descripton                  | arguments
------------------|-----------------------------|------------------------------
remove            | 当文件被删除                 | file
uploadError       | 文件上传错误时候              | file
uploadsucceed     | 成功时返回                   | file ，baseUrl

## Region对应表格


Region中文名称 |Region英文名称 |外网域名 |
------------------|------------------------------|:----------------------:|
中国（北京）|BEIJING|ks3-cn-beijing.ksyun.com
中国（上海）|SHANGHAI|ks3-cn-shanghai.ksyun.com
中国（广州）|GUANGZHOU|ks3-cn-guangzhou.ksyun.com
中国（青岛）|QINGDAO|ks3-cn-qingdao.ksyun.com
中国（香港）|HONGKONG|ks3-cn-hk-1.ksyun.com
中国（杭州）|HANGZHOU|kss.ksyun.com