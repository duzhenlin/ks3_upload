<template>
  <div>
    <div id="container">
      <Button id="browse" type="primary">选择文件</Button>
      <Button id="start-upload" type="primary" @click="startUpload">开始上传</Button>
    </div>
    <div class="file-panel">
      <h2>文件列表</h2>
      <div class="file-list">
        <ul class="file-item" :class="`file-${file.id}`" v-for="file in fileList" :key="file.id">
          <li class="file-type" :icon="fileCategory(file.name)"></li>
          <li class="file-name">{{Cutsubstr(file.oldname,30)}}</li>
          <li class="file-size">{{fileSize(file.origSize)}}</li>
          <li class="file-status">等待上传...</li>
          <li class="file-operate">
            <!-- <a title="开始" @click="resume(file)"><Icon type="ios-play" /></i></a> -->
            <!-- <a title="暂停" @click="stop(file)"><Icon type="ios-pause" /></i></a> -->
            <a title="移除" @click="remove(file)">
              <Icon type="md-close" />
            </a>
          </li>
          <li class="progress"></li>
        </ul>
        <div class="no-file" v-if="!fileList.length">
          <i class="iconfont icon-empty-file"></i> 暂无待上传文件
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Ks3 from "../../assets/ks3/src/ks3jssdk";
import "../../assets/ks3/src/zh_CN";
import Vue from "vue";
import "./style.scss";
Vue.prototype.$ks3 = Ks3;
export default {
  name: "Ks3Upload",
  components: {},
  props: {
    Signature: {
      type: Object,
      default: () => {}
    },
    mime_types: {
      type: [Array],
      default: () => [
        {
          title: "files ",
          extensions:
            "mp4,mov,qt,ts,rmvb,rm,avi,flv,mkv,wmv,mpg,mpeg,m2v,m4v,3gp,3g2,webm,vob,ogv,ogg,jpg,jpeg"
        }
      ]
    },
    //限制上传大小
    max_file_size: {
      type: String,
      default: "3gb"
    },
    //是否可以重复选用
    prevent_duplicates: {
      type: Boolean,
      default: true
    },
    region: {
      type: String,
      default: "BEIJING"
    }
  },
  data() {
    return {
      fileList: [],
      getMd5: {},
      uploader: null,
      pluploadOptions: {
        browse_button: "browse", //触发对话框的DOM元素自身或者其ID
        drop_element: document.body, //指定了使用拖拽方式来选择上传文件时的拖拽区域，即可以把文件拖拽到这个区域的方式来选择文件。该参数的值可以为一个DOM元素的id,也可是DOM元素本身，还可以是一个包括多个DOM元素的数组。如果不设置该参数则拖拽上传功能不可用。目前只有html5上传方式才支持拖拽上传。
        filters: {
          mime_types: [],
          max_file_size: "3gb", //最大只能上传3GB的文件
          prevent_duplicates: true //不允许选取重复文件
        }
      }
    };
  },
  beforeCreate() {},
  created() {
    // console.log(this.$ks3);
    // console.log(this.$ks3.config);
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.Signature.bucket) throw new Error("请配置bucket!");
      this.upload();
    });
  },
  methods: {
    remove(file) {
      // 在队列中移除文件
      this.uploader.uploader.removeFile(file);
      // 在ui上移除
      let index = this.fileList.findIndex(ele => ele.id === file.id);
      this.fileList.splice(index, 1);
      this.$emit("remove", file);
    },
    fileSize(fileSize) {
      if (fileSize < 1024) {
        return fileSize + "B";
      } else if (fileSize < 1024 * 1024) {
        var temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + "KB";
      } else if (fileSize < 1024 * 1024 * 1024) {
        var temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + "MB";
      } else {
        var temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + "GB";
      }
    },
    Cutsubstr(str, len) {
      if (!str || !len) {
        return "";
      }
      var build = "";
      for (var i = 0; i < str.length && len > 0; i++) {
        build += str.substr(i, 1);
        len -= str.charCodeAt(i) > 127 ? 2 : 1;
      }
      if (build.length < str.length) build += "...";
      return build;
    },

    fileCategory(filename) {
      let index = filename.lastIndexOf(".");
      let ext = filename.substr(index + 1);
      let type = "";
      const typeMap = {
        image: ["gif", "jpg", "jpeg", "png", "bmp", "webp"],
        video: ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"],
        text: [
          "doc",
          "txt",
          "docx",
          "pages",
          "epub",
          "pdf",
          "numbers",
          "csv",
          "xls",
          "xlsx",
          "keynote",
          "ppt",
          "pptx"
        ],
        audio: ["wav", "mp3"]
      };
      Object.keys(typeMap).forEach(_type => {
        const extensions = typeMap[_type];
        if (extensions.indexOf(ext) > -1) {
          type = _type;
        }
      });
      return type;
    },
    ks3UploadUrl() {
      let protocol;
      if (window.location.protocol === "https:") {
        protocol = "https";
      } else {
        protocol = "http";
      }
      return (
        protocol +
        "://" +
        this.$ks3.ENDPOINT[this.region] +
        "/" +
        this.Signature.bucket
      );
    },
    startUpload() {
      this.uploader.uploader.start();
    },
    randomString(len = 32) {
      const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      const maxPos = chars.length;
      let pwd = "";
      for (let i = 0; i < len; i += 1) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    upload_subdir() {
      let date = new Date();
      return (
        date.getFullYear() + "" + date.getMonth() + "/" + date.getDate() + "/"
      );
    },
    newFilenName(filename) {
      let index = filename.lastIndexOf(".");
      let suffix = filename.substr(index);
      return this.randomString() + suffix;
    },
    upload() {
      let my = this;
      var ks3Options = {
        KSSAccessKeyId: this.Signature.KSSAccessKeyId,
        policy: this.Signature.Policy,
        signature: this.Signature.Signature,
        bucket_name: this.Signature.bucket,
        key: "${filename}",
        acl: "public-read",
        uploadDomain: this.ks3UploadUrl(),
        autoStart: false,
        "x-kss-meta-custom-param1": "Hello",
        "x-kss-newfilename-in-body": true,
        "Cache-Control": "max-age=600", //设置缓存多少秒后过期
        // Expires: new Date(getExpires(600) * 1000), //设置缓存过期时间
        "Content-Disposition": "attachment;filename=", // 触发浏览器下载文件
        //'Content-Type' :' application/octet-stream',
        onUploadProgressCallBack: function(uploader, obj) {
          $(`.file-${obj.id} .progress`).css("width", obj.percent + "%");
          $(`.file-${obj.id} .file-status`).html(obj.percent + "%");
        },
        onFileUploadedCallBack: function(uploader, obj) {
          $(`.file-${obj.id} .progress`).css("background", "#f2f2f2");
          $(`.file-${obj.id} .file-status`).html("上传成功");
          my.$emit("uploadsucceed", obj);
        },
        onFilesAddedCallBack: function(uploader, objArray) {
          // my.fileList = objArray;
          //objArray是等待上传的文件对象的数组
          if (objArray.length > 0) {
            for (var i = 0; i < objArray.length; i++) {
              my.fileList.push(objArray[i]);
              objArray[i].oldname = objArray[i].name;
            }
          }
        },
        onBeforeUploadCallBack: function(uploader, obj) {
          //改名上传文件
          obj.oldname = obj.name;
          let newObjectKey = my.upload_subdir() + my.newFilenName(obj.name);
          uploader.settings.multipart_params["key"] = newObjectKey;
          obj.name = newObjectKey;
        },
        onErrorCallBack: function(uploader, errObject) {
          if (errObject.status === 413 || errObject.status === 415) {
            var responseXML = this.$ks3.parseStringToXML(errObject.response);
            // alert(Ks3.xmlToJson(responseXML)["Error"]["Message"]);
            my.$Notice.error({
              title: this.$ks3.xmlToJson(responseXML)["Error"]["Message"]
            });
          } else {
            my.$Notice.error({
              title: errObject.message
            });
          }
          $(`.file-${errObject.file.id} .progress`).css(
            "background",
            "#ff9900"
          );

          $(`.file-${errObject.file.id} .file-status`).html("上传失败");
          my.$emit("uploadError", errObject.file);
        }
      };
      this.pluploadOptions.filters = this.mime_types;
      this.pluploadOptions.filters.max_file_size = this.max_file_size;
      this.pluploadOptions.filters.prevent_duplicates = this.prevent_duplicates;
      this.uploader = new ks3FileUploader(ks3Options, this.pluploadOptions);
    }
  }
};
</script>


