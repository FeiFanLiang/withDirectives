import { defineComponent} from 'vue'
import './styles.css'
export default defineComponent({
    props:{
        name:{
            type:String
        }
    },
    render(){
        return <div>{this.$slots.default?.()}</div>
    }
})