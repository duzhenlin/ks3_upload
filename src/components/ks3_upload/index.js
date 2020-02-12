import ks3Upload from './ks3_upload'

const install = Vue => {
    if (install.installed) {
        return
    }

    install.installed = true

    Vue.component(ks3Upload.name, ks3Upload)
}

ks3Upload.install = install

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ks3Upload)
}

export default ks3Upload