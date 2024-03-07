import { defineComponent} from 'vue'
import './styles.css'

export default defineComponent({
    props:{
        name:{
            type:String
        }
    },
    setup(props,{slots}){
        return () => <div>{slots.default?.()}</div>
    }
})