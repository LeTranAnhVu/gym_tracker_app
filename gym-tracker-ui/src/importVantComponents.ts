import { Button, Locale } from 'vant'
import { App } from 'vue'
import enUS from 'vant/es/locale/lang/en-US'

export default function importVantComponents(app: App<Element>) {
    Locale.use('en-US', enUS)
    app.use(Button)
}
