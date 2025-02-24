import { defineComponent, ref, withDirectives, vShow,createTextVNode } from "vue";
import "./styles.css";
import {flatten} from './flatten'

export default defineComponent({
  props: {},
  setup(props, { slots }) {
    const activeName = ref("1");
    const pane = flatten(slots.default())
    pane.forEach(vnode => {
        console.log(typeof vnode)
    })
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
    return () => (
      <div>
        <div className="tabs-nav">{tabs}</div>
        <div className="content">{panelVnodes(pane,renderedNames,activeName.value)}</div>
      </div>
    );
  },
});


function panelVnodes (pane,renderedNames,activeName) {
    const childrens = [];
    pane.forEach((vnode) => {
      const name = vnode.props.name;
      if (vnode.key !== undefined) {
        vnode.key = name;
      }
      const show = activeName === name;
      if (show || renderedNames.has(name)) {
        if (!renderedNames.has(name)) {
          renderedNames.add(name);
        }
        console.log(show,name)
        childrens.push(withDirectives(vnode, [[vShow, show]]));
      }
    });
    return childrens;
  };