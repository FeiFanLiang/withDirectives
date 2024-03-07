import { defineComponent, ref, withDirectives, vShow } from "vue";
import "./styles.css";

export default defineComponent({
  props: {},
  setup(props, { slots }) {
    const activeName = ref("1");
    const pane = slots.default();
    debugger
    const onTabClick = (name) => {
      activeName.value = name;
    };
    const tabs = pane.map((vnode) => {
      return (
        <div onClick={() => onTabClick(vnode.props.name)} className="tab">
          {vnode.props.name}
        </div>
      );
    });

    const renderedNames = new Set();
    const panelVnodes = () => {
      const childrens = [];
      pane.forEach((vnode) => {
        const name = vnode.props.name;
        if (vnode.key !== undefined) {
          vnode.key = name;
        }
        const show = activeName.value === name;
        if (show || renderedNames.has(name)) {
          if (!renderedNames.has(name)) {
            renderedNames.add(name);
          }
          childrens.push(withDirectives(vnode, [[vShow, show]]));
        }
      });
      
      return childrens;
    };
    return () => (
      <div>
        <div className="tabs-nav">{tabs}</div>
        <div>{panelVnodes()}</div>
      </div>
    );
  },
});
